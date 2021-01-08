const homeConfig = () => {
  return {
    url:'/',
    parent: 'main',
    resolve: {
      content: ['pageFactory', 'metaService', (pageFactory, metaService) => {
        return pageFactory.getPage('homepage').then(data => {
          metaService.setProperties({
            title: 'Home | LMP'
          });

          return data;
        })
      }],
      featured: ['featuredFactory', (featuredFactory) => featuredFactory.getContent()],
      caliente: ['calienteFactory', (calienteFatctory) => calienteFatctory.getContent()]
    },
    views: {
      'content@main': {
        component: 'frontPage',
        bindings: {
          content: 'content',
          featured: 'featured',
          caliente: 'caliente'
        }
      }
    }
  }
}
