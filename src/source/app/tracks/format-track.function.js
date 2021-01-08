function format_track(track) {
  track.id = `track-${track.id}`;
  track.duration_display = track.duration;
  
  delete track.duration;
  
  track.title = decodeURIComponent(track.title.rendered);
  track.artists = decodeURIComponent(track.artists);
  track.format = track.type;

  delete track.type;

  return track;
}
