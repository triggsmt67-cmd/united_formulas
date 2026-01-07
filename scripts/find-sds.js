
const query = `
query GetAllProducts {
  products(first: 100) {
    nodes {
      slug
      name
      ... on SimpleProduct {
        productData {
          sdssheet
        }
      }
      ... on VariableProduct {
        productData {
          sdssheet
        }
      }
    }
  }
}
`;

async function checkSds() {
    try {
        const response = await fetch('https://ufbackend.com/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        });
        const data = await response.json();
        if (!data.data || !data.data.products) {
            console.log('No data returned', data);
            return;
        }
        const products = data.data.products.nodes;
        const withSds = products.filter(p => p.productData && p.productData.sdssheet);
        console.log('Products with SDS:', withSds.map(p => ({ name: p.name, slug: p.slug, sds: p.productData.sdssheet })));
    } catch (err) {
        console.error('Fetch error:', err);
    }
}

checkSds();
