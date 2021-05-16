import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import DefaultLayoutContainer from './redux/containers/DefaultLayoutContainer'

function App() {
  return (
    <Switch>
      <Route path="/" component={DefaultLayoutContainer} />
    </Switch>
    
  );
}
export default App;
