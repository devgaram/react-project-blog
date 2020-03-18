import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'store/modules';
import rootSaga from 'store/sagas';
import 'styles/default.scss';
import App from 'containers/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const token = 'e32b5cb70b518eed189e7624415a5f9e5bfc72b2';
const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    'Authorization': 'bearer ' + token
  }
});
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
