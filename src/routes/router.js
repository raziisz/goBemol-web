import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRouter from './PrivateRouter';

import Login from '../pages/Login';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';

export default function Routes() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/signup" component={SignUp} />
            <PrivateRouter path="/home" component={Home} />
            <Route path='*' exact component={() => <h1>Página não encontrada.</h1>} />
          </Switch>
        </BrowserRouter>
      )
}