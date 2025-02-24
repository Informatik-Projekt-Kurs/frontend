"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  InMemoryCache,
  ApolloClient,
  SSRMultipartLink
} from "@apollo/experimental-nextjs-app-support";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "@/lib/authActions.server";

function makeClient() {
  const httpLink = new HttpLink({
    uri: "/graphql",
    fetchOptions: {
      cache: "no-store",
      credentials: "omit"
    }
  });

  // Error handling link
  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    const context = operation.getContext();

    if (networkError !== null) {
      console.log("Network error:", networkError);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (networkError?.statusCode === 401 && context.requiresAuth === false) {
        console.log("Got 401 for operation marked as public:", operation.operationName);
      }
    }

    if (graphQLErrors !== null) {
      console.log("GraphQL errors:", graphQLErrors);
    }
  });

  const authLink = setContext(async (operation, { headers }) => {
    // Default to requiring auth unless explicitly set to false
    const requiresAuth = operation.context?.requiresAuth !== false;

    if (requiresAuth) {
      try {
        const token = await getAccessToken();
        if ((token ?? "") !== "") {
          return {
            headers: {
              ...headers,
              authorization: `Bearer ${token}`
            }
          };
        }
      } catch (error) {
        console.error("Error getting access token:", error);
      }
    }

    return {
      headers: {
        ...headers,
        // You might need to add any default headers your API expects
        "Content-Type": "application/json"
      }
    };
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true
            }),
            errorLink, // Add error link
            authLink,
            httpLink
          ])
        : ApolloLink.from([errorLink, authLink, httpLink])
  });
}

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
