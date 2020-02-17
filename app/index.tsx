import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import configureStore from './configureStore';
import App from './components/App';

const initialState = {};
const store = configureStore(initialState);

render(
  (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  ),
  document.getElementById('app')
);