const axios = require('axios');

const GRAPHQL_URL = "https://ufbackend.com/graphql";

const GET_CATEGORIES = `
  query GetCategories {
    productCategories(first: 20) {
      nodes {
        id
        name
        slug
        image {
          sourceUrl
        }
      }
    }
  }
`;

async function checkCategories() {
    try {
        const response = await axios.post(GRAPHQL_URL, {
            query: GET_CATEGORIES
        });

        const categories = response.data.data.productCategories.nodes;
        console.log("Current WordPress Category Images:");
        categories.forEach(cat => {
            console.log(`- ${cat.name} (${cat.slug}): ${cat.image ? cat.image.sourceUrl : 'No Image'}`);
        });
    } catch (error) {
        console.error("Error fetching categories:", error.message);
    }
}

checkCategories();
