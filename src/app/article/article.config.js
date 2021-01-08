const articleConfig = () => {
  return {
    url:'/news/:slug',
    parent: 'main',
    resolve: {
      content: ['articleFactory', '$stateParams', 'metaService', (articleFactory, $stateParams, metaService) => {
        return articleFactory.getArticle($stateParams.slug).then(data => {
            metaService.setProperties({
            title: `${data.title} | News | LMP`,
            image: data.artwork_large,
            type: 'article'
          });

          return data;
        });
      }]
    },
    views: {
      'content@main': {
        component: 'article',
        bindings: {
          songs: 'content'
        }
      }
    }
  }
}
