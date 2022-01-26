// index.js
// This is the main entry point of our application

import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './components/GlobalStyle';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
// import { ApolloProvider } from "react-apollo";

import { Pages } from '/pages';

// Настраиваем API URI и кэш
// const uri = process.env.API_URI; //не работает почему-то
const uri = 'http://localhost:4000/api';
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

// Проверяем наличие токена и возвращаем заголовки в контекст
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  };
});
// Настраиваем Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true
});
// Проверяем наличие локалбного кеша
const data = {
  isLoggedIn: !!localStorage.getItem('token')
};
// Записываем данные кэша при начальной загрузке
cache.writeData({ data });
// Записываем данные кеша после его сброса
client.onResetStore(() => cache.writeData({ data }));

const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
