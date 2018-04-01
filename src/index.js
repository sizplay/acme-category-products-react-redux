import React from 'react';
import { render } from 'react-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';

const root = document.getElementById('root');
render((
  <Provider store={ store }>
    <App />
  </Provider>
)
, root);

