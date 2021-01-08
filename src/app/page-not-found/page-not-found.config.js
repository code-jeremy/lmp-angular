const pageNotFoundConfig = () => {
  return {
    url: '/:path',
    parent: 'main',
    views: {
      'content@main': {
        component: 'pageNotFound',
      }
    }
  };
}
