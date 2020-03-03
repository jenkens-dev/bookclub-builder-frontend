import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import BookClubShow from './BookClubShow';
import CreatePoll from './CreatePoll';
import EditBookClub from './EditBookClub';
import NavBar from './NavBar';
import CreateBookClub from './CreateBookClub';
import MyBookClub from './MyBookClubs';
import PollOptions from './PollOptions';

const MainContainer = props => {
   return (
      <Router>
         <div>
            <NavBar />
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
               path="/bookclubs/:id/:poll_id/options"
               render={routerProps => <PollOptions {...routerProps} />}
            />
            <Route
               exact
               path="/bookclubs/:id/edit"
               render={routerProps => <EditBookClub {...routerProps} />}
            />
            <Route
               exact
               path="/bookclubs"
               render={routerProps => <CreateBookClub {...routerProps} />}
            />
            <Route
               exact
               path="/:id/bookclubs"
               render={routerProps => <MyBookClub {...routerProps} />}
            />
         </div>
      </Router>
   );
};

export default MainContainer;
