import React from 'react';
import { Route, Redirect } from "react-router-dom";

import { isAuthenticated } from '../services/auth';
// import { Container } from './styles';

export default function PrivateRouter({component: Component, ...rest}) {
  return (
   <Route {...rest} render={props => (
    isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{pathname: '/', state: { from: props.location}}} />
    )
   )} />
  );
}