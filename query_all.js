const fetch = require('node-fetch');

const query = `
  query GetAllProducts {
    products(first: 100) {
      nodes {
        id
        name
        sku
        slug
        ... on SimpleProduct {
          price
        }
        ... on VariableProduct {
          price
          variations(first: 100) {
            nodes {
              id
              name
              sku
              price
            }
          }
        }
      }
    }
  }
`;

fetch('https://ufbackend.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query })
})
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data.data.products.nodes.slice(0, 2), null, 2)))
  .catch(console.error);
