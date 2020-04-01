import ApolloClient, {
  IntrospectionFragmentMatcher,
  InMemoryCache
} from "apollo-boost";

export default function configureApolloClient() {
  // Github Graphql API: TIL 레파지토리 데이터 접근
  const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    headers: {
      Authorization: `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
    },
    cache: new InMemoryCache({
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
