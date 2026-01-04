const axios = require('axios');
const API_URL = 'https://ufbackend.com/graphql';

const MEDIA_QUERY = `
  query GetMedia {
    mediaItems(first: 5) {
      nodes {
        id
        title
        mimeType
        mediaItemUrl
        guid
      }
    }
  }
`;

async function test() {
    try {
        const response = await axios.post(API_URL, {
            query: MEDIA_QUERY
        });
        console.log(JSON.stringify(response.data.data.mediaItems.nodes, null, 2));
    } catch (error) {
        console.error('Error:', error.message);
    }
}
test();
