// index.js
// This is the main entry point of our application

import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './components/GlobalStyle';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// import { ApolloProvider } from "react-apollo";

import { Pages } from '/pages';

// Настраиваем API URI и кэш
// const uri = process.env.API_URI; //не работает почему-то
const uri = 'http://localhost:4000/api';
const cache = new InMemoryCache();

// Настраиваем Apollo Client
const client = new ApolloClient({
  uri,
  cache,
  connectToDevTools: true
});
const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
