const { ApolloClient, InMemoryCache, HttpLink, gql } = require("@apollo/client");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'https://unitedformulas.com/graphql',
        fetch
    }),
    cache: new InMemoryCache(),
});

const GET_SLUGS = gql`
  query GetSlugs {
    products(first: 5) {
      nodes {
        slug
      }
    }
  }
`;

client.query({ query: GET_SLUGS })
    .then(res => {
        console.log(JSON.stringify(res.data.products.nodes, null, 2));
    })
    .catch(err => console.error(err));
