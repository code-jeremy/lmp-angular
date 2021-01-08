const queueConfig = () => {
  return {
    url:'/queue',
    parent: 'main',
    views: {
      'content@main': {
        component: 'queue'
      }
    }
  }
}