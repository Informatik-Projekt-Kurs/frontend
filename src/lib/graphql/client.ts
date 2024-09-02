import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {
  const backendDomain = process.env.BACKEND_DOMAIN;
  const graphqlUri =
    backendDomain !== undefined && backendDomain !== null && backendDomain !== ""
      ? `${backendDomain}/graphql`
      : "/graphql";

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: graphqlUri
    })
  });
});
