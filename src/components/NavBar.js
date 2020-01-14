import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';

const NavBar = () => {
   const currentUser = useSelector(state => state.auth.user.id);
   console.log(currentUser);
   return (
      <div>
         {currentUser ? (
            <AppBar position="static">
               <Toolbar>
                  <Button color="inherit" href="/">
                     Home
                  </Button>
                  <Button color="inherit">My Bookclubs</Button>
                  <Button color="inherit">Create Bookclub</Button>
               </Toolbar>
            </AppBar>
         ) : (
            <AppBar position="static">
               <Toolbar>
                  <Button color="inherit" href="/">
                     Home
                  </Button>
                  <Button color="inherit" href="/login">
                     Login
                  </Button>
               </Toolbar>
            </AppBar>
         )}
      </div>
   );
};

export default NavBar;
