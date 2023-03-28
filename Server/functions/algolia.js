const algoliasearch = require('algoliasearch');


const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);

const index = algoliaClient.initIndex('innate_SERVICESINFO');

module.exports = { index };