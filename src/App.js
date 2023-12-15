import React, { useEffect } from 'react';
import './App.css';
import RoutesPath from './Routes/RoutePath';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  split,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context"
import { useSelector } from 'react-redux';
import { getMainDefinition } from '@apollo/client/utilities';
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});
const authLink = setContext((_, { headers }) => {

  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(`vjw-${window.location.hostname}-token`);
  const ref_token = localStorage.getItem(`vjw-${window.location.hostname}user`)

  // return the headers to the context so httpLink can read them
  if (_.operationName == "storeDetails") {
    let token = localStorage.getItem(`vjw-${window.location.hostname}ad-token`)
    return {
      headers: {
        ...headers,
        Authorization: token ? `JWT ${token}` : "",
      },
    };
  }

  if (token) {
    return {
      headers: {
        ...headers,
        Authorization: token ? `JWT ${token}` : "",
      },
    };
  }
  else if (ref_token) {
    return {
      headers: {
        ...headers,
        Authorization: ref_token ? `JWT ${JSON.parse(ref_token)?.token}` : "",
      },
    };
  }
  else { return { headers: { ...headers } } }
});

// const link = from([
//   errorLink,
//   // new HttpLink({ uri: process.env.REACT_APP_URI }),
//   new HttpLink({
//     uri:
//       (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://165.232.190.124/graphql/' : window.location.origin + '/graphql/'
//   }), new HttpLink({
//     uri: "https://goldclub.co/graphql/"
//   }),
// ]);

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === 'OperationDefinition' &&
      (definition.name?.value === 'storeDetails' || definition.name?.value === 'createToken' || definition.name?.value === 'publishedBanners')
    );
  },
  new HttpLink({
    uri: process.env.REACT_APP_URI,

  }),
  new HttpLink({
    uri:
      // (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'https://sinjewllers.goldclub.co/graphql/' : 
      window.location.origin + '/graphql/'
  })
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),

});


function App() {

  return (

    <ApolloProvider client={client}>
      <RoutesPath />
    </ApolloProvider>
  );
}

export default App;





