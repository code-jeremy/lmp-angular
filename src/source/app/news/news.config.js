const newsConfig = () => {
  return {
    url:'/news?page',
    parent: 'main',
    resolve: {
      content: [ 'newsFactory', '$stateParams', 'metaService', function(newsFactory, $stateParams, metaService) {
        return newsFactory.getNews(($stateParams.page || 1)).then(data => {
          metaService.setProperties({
            title: `${$stateParams.page && parseInt($stateParams.page, 10) > 1 ? 'Page ' + $stateParams.page + ' | ' : ''}News | LMP`
          });

          return data;
        });
      }]
    },
    views: {
      'content@main': {
        component: 'news',
        bindings: {
          content: 'content'
        }
      }
    }
  }
}
