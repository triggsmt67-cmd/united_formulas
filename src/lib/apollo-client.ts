import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

let client: ApolloClient<any> | null = null;

export const getClient = () => {
    // Hardcoded URL to prevent server-side parsing errors on Vercel
    const GRAPHQL_URL = "https://ufbackend.com/graphql";

    if (!client || typeof window === "undefined") {
        client = new ApolloClient({
            link: new HttpLink({
                uri: GRAPHQL_URL,
                fetchOptions: { cache: "no-store" },
            }),
            cache: new InMemoryCache(),
        });
    }

    return client;
};

export default getClient();
