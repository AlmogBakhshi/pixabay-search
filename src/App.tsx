import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './scss/style.scss';
import Images from './components/Images';
import SearchImages from './components/Images/search';

function App() {
  return (
    <BrowserRouter basename='/'>
      <Switch>
        <Route path='/search' component={SearchImages} />
        <Route path='/' component={Images} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
