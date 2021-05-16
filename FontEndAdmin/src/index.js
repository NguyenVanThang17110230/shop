import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.bundle'

import { icons } from './assets/icons'
import AppContainer from './redux/containers/AppContainer';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store1 from './store'
import { createStore } from 'redux';
import appReducers from './redux/reducers/index';

const store = createStore(
  appReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
React.icons = icons
ReactDOM.render(
  <BrowserRouter>
    <Provider store = {store}>
      <AppContainer/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
