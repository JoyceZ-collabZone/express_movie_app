import React from 'react';
import { Redirect } from "react-router-dom";
import { isLoggedIn } from '../App';

//private route uses object destructuring
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
function PrivateRoute({ children, ...rest }) {

    console.log(children);
    console.log({...rest});
    const path = {...rest}.path;  
  
    //if logged in render all child component, we mostly use a single component
    if(isLoggedIn()) {
      return (
        children
      )
    }
  
    //if not logged in redirect to login page, also pass the route/path the
    //user was loading prior to auth
    return (
      <Redirect 
        to={{
          pathname: '/login',
          state: { from: path }
        }}
      />
    )
  
  }

  export default PrivateRoute;