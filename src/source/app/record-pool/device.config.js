const recordPoolDeviceConfig = () => {
  return {
    url: '/record-pool-device',
    parent: 'main',
    resolve: {
      auth: ['protectFactory', (protectFactory) => protectFactory.checkAuth()],
      content: ['pageFactory', 'metaService', (pageFactory, metaService) => {
        return pageFactory.getPage('record-pool-device').then(data => {
          metaService.setProperties({
            title: `${data.title} | LMP`
          });

          return data;
        });
      }],
      device: ['deviceFactory', (deviceFactory) => deviceFactory.getDevice()]
    },
    views: {
      'content@main': {
        component: 'device',
        bindings: {
          content: 'content',
          device: 'device'
        }
      }
    }
  }
}
