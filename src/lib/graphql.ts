import { ApolloClient, HttpLink, InMemoryCache, type NormalizedCacheObject } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient((): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: process.env.GRAPHQL_URL
    })
  });
});
