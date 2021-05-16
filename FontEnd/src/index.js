import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.bundle'
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import appReducers from './redux/reducers/index';
import { Provider } from 'react-redux';
const store = createStore(
  appReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
    {/* <Provider> */}
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
// App.listen(process.env.PORT || 3000, function(){
//   console.log("Express server listening on port %d in %s mode", this.address().port, App.settings.env);
// });
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
