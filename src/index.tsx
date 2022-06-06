import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app/App';
import config from 'app/config';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import reportWebVitals from './reportWebVitals';
import 'assets/styles/style.scss';
import 'antd/dist/antd.css';

const client = new ApolloClient({
  uri: config.graphql,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

reportWebVitals();
