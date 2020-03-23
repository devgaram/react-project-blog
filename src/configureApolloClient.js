import ApolloClient from "apollo-boost";
import {
  IntrospectionFragmentMatcher,
  InMemoryCache
} from "apollo-cache-inmemory";

export default function configureApolloClient() {
  // Github Graphql API: TIL 레파지토리 데이터 접근
  const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    headers: {
      Authorization: `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
    },
    cache: new InMemoryCache({
      // unions/interfaces 작동 위해 필요
      fragmentMatcher: new IntrospectionFragmentMatcher({
        introspectionQueryResultData: {
          __schema: {
            types: []
          }
        }
      })
    })
  });
  return client;
}
