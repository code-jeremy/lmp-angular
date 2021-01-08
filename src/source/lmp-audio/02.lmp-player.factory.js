(function() {
  'use strict';

  angular
  .module('lmpAudio')
  .factory('lmpPlayer', lmpPlayer);

  lmpPlayer.$inject = ['$timeout', '$localStorage', 'playsFactory', 'durationFactory', 'lmpTrackFinder', '$window'];

  function lmpPlayer($timeout, $localStorage, playsFactory, durationFactory, lmpTrackFinder, $window) {
    const lmp_player = {
      howl: false,
      display: {
        progress: '0:00', // $localStorage.current ? lmp_player.format_time($localStorage.current.progress.toFixed(0)) : '0:00',
        duration: '0:00', // $localStorage.current ? $localStorage.current.duration_display : '0:00',
        width: 0
      }
    };

    // lmp_player.display = () => {''
    //           alert('here')
    //   return {
    //     progress: $localStorage.current ? lmp_player.format_time($localStorage.current.progress.toFixed(0)) : '0:00',
    //     duration: $localStorage.current ? $localStorage.current.duration_display : '0:00',
    //     width: 0
    //   };
    // }
    lmp_player.error = error => $localStorage.state = 'idle';

    lmp_player.find_track = track_id => {
      lmp_player.pause();

      lmpTrackFinder.search(track_id).then((res) => {
        if (res) return lmp_player.play(res);

        return lmp_player.error('Track not found');
      });
    };

    lmp_player.play = track => {
      $localStorage.current = track;
      $localStorage.loading = track.id;
      $localStorage.state = 'loading';
    
      // If howl exists stop it, replace the src, load and play.
      // Otherwise, setup and load a new Howl.
      if (lmp_player.audio) {
        if (lmp_player.step_timeout) {
          $timeout.cancel(lmp_player.step_timeout);
        }

        lmp_player.audio.unload();
        lmp_player.display.duration = false;
        lmp_player.display.progress = false;
        lmp_player.width = false;
      }

      lmp_player.audio = new Howl({
        src: [ track.url ],
        ext: ['mp3'],
        autoplay: true,
        html5: true,
        onplay: () => {
          if (track.progress) {
            lmp_player.audio.seek(track.progress);
          }

          let duration = lmp_player.format_time(Math.round(lmp_player.audio.duration()));

          if ((!$localStorage.current.duration_display || duration !== $localStorage.current.duration_display) && track.id !== 'lmp-radio') {
            durationFactory.update(track.id, duration).then((res) => res);
          }

          $localStorage.current.duration_display = lmp_player.display.duration = duration;

          lmp_player.step();

          $localStorage.loading = '';
          $localStorage.state = 'playing';
          
          $window.ga('send', 'event', 'Audio', 'Plays',
            (track.id === 'lmp-radio' ? 'LMPRadio' : `${track.id} | ${track.title}`));
          
          if (track.id !== 'lmp-radio') {
            playsFactory.addPlay(track.id).then((res) => {
              if (res.plays) {
                for (let i = 0; i < $localStorage.playlist.length; i += 1) {
                  if (track.id === $localStorage.playlist[i].id) {
                    $localStorage.playlist[i].plays = res.plays;
                  }
                }
              }
            });
          }
        },
        onload: () => {
          // IGNORE
        },
        onend: () => lmp_player.skip('next'),
        onpause: () => { 
          $localStorage.loading = '';
          $localStorage.state = 'idle'; 
        },
        onstop: () => {
          $localStorage.loading = '';
          $localStorage.state = 'idle'; 
        },
        loaderror: () => {
          $localStorage.loading = '';
          $localStorage.state = 'idle';
          return lmp_player.error(`Track couldn't be played`);
        },
      });
    }

    lmp_player.pause = () => {
      if (lmp_player.audio) {
        if (lmp_player.audio.playing()) {	
          lmp_player.audio.pause(lmp_player.audio._sounds[0]._id);
        }
      }
    };

    lmp_player.resume = () => {
      if (lmp_player.audio) {
        if (!lmp_player.audio.playing()) { 
          lmp_player.audio.play(lmp_player.audio._sounds[0]._id);
        }
      } else {
        lmp_player.play($localStorage.current);
      }
    };

    lmp_player.skip = direction => {
      lmp_player.pause();

      // If current track exists and is also the only track in playlist
      // pause player
      if ($localStorage.current && $localStorage.playlist.length === 1 && $localStorage.playlist[0].id === $localStorage.current.id) {
        return;
      }

      if ($localStorage.playlist.length === 0 && $localStorage.queue.length > 0) {
        $localStorage.playlist = $localStorage.queue;
        $localStorage.queue = [];
      }

      let i = 0;
      
      switch( direction ) {
        case 'prev':
          // If no current track play the last playlist track
          if (!$localStorage.current) {
            if ($localStorage.playlist.length > 0) {
              return lmp_player.play($localStorage.playlist[($localStorage.playlist.length - 1)]);
            }
          } else {
            // Find current track in playlist and play prev or last
            for (i = 0; i < $localStorage.playlist.length; i += 1) {
              // If first track is current then play the last
              if (i === 0 && $localStorage.current.id === $localStorage.playlist[i].id) {
                return lmp_player.play($localStorage.playlist[($localStorage.playlist.length - 1)]);
              }

              // If current playing id equals current playlist track id play the previous
              if (i > 0 && $localStorage.playlist[i].id === $localStorage.current.id) {
                return lmp_player.play($localStorage.playlist[(i - 1)]);
              }
            }
          }
          
          if ($localStorage.playlist.length > 0) {
            return lmp_player.play($localStorage.playlist[($localStorage.playlist.length - 1)]);
          }
        break;
        case 'next':
          // If no current track play the first playlist track
          if (!$localStorage.current) {
            if ($localStorage.playlist.length > 0) {
              return lmp_player.play($localStorage.playlist[0]);
            }
          } else {
            for(i = 0; i < $localStorage.playlist.length; i += 1) {
              // If current track is last in playlist then play first track
              if ((i + 1) === $localStorage.playlist.length && $localStorage.current.id === $localStorage.playlist[i].id) {
                return lmp_player.play($localStorage.playlist[0]);
              }
              // If track is current and more exist then play next
              if ((i + 1) < $localStorage.playlist.length && $localStorage.current.id === $localStorage.playlist[i].id) {
                return lmp_player.play($localStorage.playlist[(i + 1)]);
              }
            }
          }
          
          if ($localStorage.playlist.length > 0) {
            return lmp_player.play($localStorage.playlist[0]);
          }

        break;
      }
    };

    lmp_player.volume = () => {

    };

    lmp_player.seek = (percent) => {
      if (lmp_player.audio) {
        let dur = lmp_player.audio.duration();
        lmp_player.audio.seek(Math.round((dur / 100) * percent), lmp_player.audio._sounds[0]._id);
      }
    };

    lmp_player.step = () => {
      lmp_player.step_timeout = $timeout(() => {
        // Determine our current seek position.
        let seek = lmp_player.audio.seek() || 0;
        lmp_player.display.width = (((seek / lmp_player.audio.duration()) * 100) || 0);
        $localStorage.current.progress = seek;
        lmp_player.display.progress = lmp_player.format_time(Math.round(seek));
        // If the sound is still playing, continue stepping.
        if (lmp_player.audio.playing()) {
          lmp_player.step();
        }
      }, 500);
    };

    lmp_player.format_time = secs => {
      let hr 	= Math.floor(secs / 3600);
      let min = Math.floor((secs - (hr * 3600)) / 60);
      secs -= ((hr * 3600) + (min * 60));
      secs += ''; 
      min += ':';

      while(secs.length < 2) {
        secs = `0${secs}`;
      }

      hr = (hr) ? `${hr}:` : '';
      min = (hr.length > 0 && min.length < 3) ? `0${min}` : min;

      return `${hr}${min}${secs}`;
    };

    return lmp_player;
  }
})();
