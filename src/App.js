import React from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { SIGN_IN as signIn } from './actions/auth';
import { useDispatch } from 'react-redux';
import { api } from './services/api';

function App() {
   const dispatch = useDispatch();
   const token = localStorage.getItem('token');

   useEffect(() => {
      console.log(token);
      if (token) {
         api.auth.getCurrentUser().then(user => {
            dispatch(signIn(user));
         });
      }
   }, [dispatch, token]);

   return (
      <Router>
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
      </Router>
   );
}

export default App;
