import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';

const MainContainer = props => {
   const dispatch = useDispatch();
   const token = localStorage.getItem('token');

   useEffect(() => {
      if (!token) {
         console.log('redirect');
      }
   }, [dispatch, token]);

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
      </div>
   );
};

export default MainContainer;
