(function() {
  'use strict';

  angular
  .module('lmp')
  .factory('metaService', metaService);

  function metaService() {
    let default_properties = {
      title: 'IAMLMP',
      description: 'Artists, Latin Music, DJ Mixes, Mixtapes, on IAMLMP.COM - Reggaeton, Salsa, Bachata, Merengue, Dembow, Tipico, DJ Mixes and Mixtapes.',
      keywords: 'latin music, latin mixes, latin mixtapes, lmp, iamlmp, lomaximo reggaeton, salsa, bachata, merengue, dembow, urbano',
      type: 'website',
      image: 'https://www.iamlmp.com/assets/img/branding/lmp-social.jpg',
      url: window.location.href.replace('lmp.circular.one', 'www.iamlmp.com').replace('index.html', ''),
      ldjson: false,
      robots: 'index'
    };

    let properties = { };

    return {
      setProperties: setProperties,
      getProperties: getProperties
    };

    function setProperties(newProperties) {
      properties = newProperties;
      
      for (let key in default_properties) {
        if (!properties[key] && key !== 'keywords') {
          properties[key] = default_properties[key];
        }
      }

      properties.keywords = default_properties.keywords;

      if (newProperties.keywords) {
        properties.keywords = `${properties.keywords}, ${newProperties.keywords}`;
      }
    }

    function getProperties() {
      if (properties.keywords) {
        properties.keywords = [...new Set(properties.keywords.split(', '))]
        properties.keywords = properties.keywords.join(',');
      }
      return properties;
    }
  }
})();
