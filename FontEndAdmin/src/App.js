import React, { Component } from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import TheLayout from './containers/TheLayout';
import LoginContainer from './redux/containers/LoginContainer';
import Cookies from "js-cookie";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
// const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {
  render() {
    var { auth } = this.props
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
            {Cookies.get('loginInfoAdmin') === undefined?
            <Switch>
              {/* <Route path="/login" name="Login Page" component={LoginContainer}/> */}
              <Route path="/login" name="Login Page" component={LoginContainer}/>
              <Redirect to='/login'/>
              
            </Switch>:
            <Switch>
              <Route path='/' component={TheLayout} />
              <Redirect to='/'/>
            </Switch>
            }
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
