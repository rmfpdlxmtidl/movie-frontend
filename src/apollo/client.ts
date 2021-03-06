import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const cache = new InMemoryCache()

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL,
})

// Authenticate using HTTP header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage['token']
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
})
