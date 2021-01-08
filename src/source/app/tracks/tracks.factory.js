(function() {
  'use strict';

  angular
    .module('lmp')
    .factory('tracksFactory', tracksFactory);

  tracksFactory.$inject = ['$http', '$rootScope', '$log'];

  function tracksFactory($http, $rootScope, $log) {
    return { getMusic };

    function getMusic(format, genre, order, page, artist, per_page) {
      page = page || 1;
      order = order || false;
      artist = artist || false;
      genre = genre || false;
      per_page = per_page || 10;

      let url = `${$rootScope.base_url}/lmp-api/v1/music?`;
      url = `${url}${format == 'all' ? 'type[]=live-tracks&type[]=tracks&type[]=mixes&type[]=mixtapes&' : 'type[]=' + format + '&'}`;
      url = `${url}${artist ? '&filter[meta_query][relation]=OR&filter[meta_query][0][key]=lmp_primary_acts&filter[meta_query][0][value]=' + artist + '&filter[meta_query][0][compare]=LIKE&filter[meta_query][1][key]=lmp_secondary_acts&filter[meta_query][1][value]=' + artist + '&filter[meta_query][1][compare]=LIKE&' : ''}`;
      
      if (order && (order !== 'newest')) {
        switch (order) {
          case 'oldest':
            url = `${url}orderby=date&order=asc&`;
            break;
          case 'az':
            url = `${url}orderby=title&order=asc&`;
            break;
          case 'za':
            url = `${url}orderby=title&order=desc&`;
            break;
          case 'likes':
            url = `${url}filter[meta_key]=lmp_likes&filter[orderby]=meta_value_num&`;
            break;
          case 'plays':
            url = `${url}filter[meta_key]=lmp_plays&filter[orderby]=meta_value_num&`;
            break;
        }
      }

      url = `${url}${genre ? 'filter[taxonomy]=genre&filter[term]=' + genre + '&' : ''}`;
      url = `${url}page=${page}${per_page ? '&per_page=' + per_page : ''}`;

			return $http.get(url).then(res => {
        return {
          pages: parseInt(res.headers('X-WP-TotalPages'), 10),
          page: page ? parseInt(page, 10) : 1,
          content: res.data,
          format: format
        };
      })
      .catch(err => $log.debug(err));
    }
  }
})();
