import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Demo from './Demo';
import BookClubShow from './BookClubShow';
import CreatePoll from './CreatePoll';

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
            path="/bookclubs/:id"
            render={routerProps => <BookClubShow {...routerProps} />}
         />
         <Route
            exact
            path="/bookclubs/:id/poll"
            render={routerProps => <CreatePoll {...routerProps} />}
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
