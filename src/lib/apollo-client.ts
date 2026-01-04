import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
    link: new HttpLink({
        uri: process.env.WORDPRESS_API_URL,
    }),
    cache: new InMemoryCache(),
});

export default client;

export function getClient() {
    return client;
}
