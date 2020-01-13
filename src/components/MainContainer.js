import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Demo from './Demo';

const MainContainer = props => {
   return (
      <div>
         <Route exact path="/" render={() => <Home />} />
         <Route
            exact
            path="/login"
            render={routerProps => <Login {...routerProps} />}
         />
         <Route
            exact
            path="/signup"
            render={routerProps => <SignUp {...routerProps} />}
         />
         <Route
            exact
            path="/demo"
            render={routerProps => <Demo {...routerProps} />}
         />
      </div>
   );
};

export default MainContainer;
