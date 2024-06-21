"use client";

import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache
} from "@apollo/experimental-nextjs-app-support/ssr";

function makeClient() {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    uri: process.env.BACKEND_DOMAIN + "/graphql"
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
