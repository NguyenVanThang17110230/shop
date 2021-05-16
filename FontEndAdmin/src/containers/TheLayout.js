import React from 'react'
import Cookies from "js-cookie";
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginContainer from '../redux/containers/LoginContainer';
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = () => {

  return (
    <div>
      {Cookies.get('loginInfoAdmin') !== undefined ?
        <div className="c-app c-default-layout">
          <TheSidebar />
          <div className="c-wrapper">
            <TheHeader />
            <div className="c-body">
              <TheContent />
            </div>
            <TheFooter />
          </div>
        </div> :
        <Switch>
          <Route path="/login" name="Login Page" component={LoginContainer} />
          <Redirect to='/login' />
        </Switch>

      }
    </div>
  )
}

export default TheLayout
