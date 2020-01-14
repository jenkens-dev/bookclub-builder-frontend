import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavBar = () => {
   const currentUser = useSelector(state => state.auth.user.id);
   const history = useHistory();

   return (
      <div>
         {currentUser ? (
            <AppBar position="static">
               <Toolbar>
                  <Link to="/">
                     <Button color="inherit">Home</Button>
                  </Link>
                  <Link to="/">
                     <Button color="inherit">My Bookclubs</Button>
                  </Link>
                  <Link to="/bookclubs">
                     <Button color="inherit">Create Bookclub</Button>
                  </Link>
               </Toolbar>
            </AppBar>
         ) : (
            <AppBar position="static">
               <Toolbar>
                  <Link to="/">
                     <Button color="inherit">Home</Button>
                  </Link>
                  <Link to="/login">
                     <Button color="inherit">Login</Button>
                  </Link>
               </Toolbar>
            </AppBar>
         )}
      </div>
   );
};

export default NavBar;
