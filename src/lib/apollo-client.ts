import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const GRAPHQL_URL = "https://ufbackend.com/graphql";

/**
 * Apollo Client instance configured for United Formulas.
 * Hardcoded URL ensures Vercel server-side requests use an absolute path.
 */
const client = new ApolloClient({
    link: new HttpLink({
        uri: GRAPHQL_URL,
        fetchOptions: { cache: "no-store" },
    }),
    cache: new InMemoryCache(),
});

export const getClient = () => client;
export default client;
