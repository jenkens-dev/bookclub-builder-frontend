import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { SIGN_OUT as signOut } from '../actions/auth';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const NavBar = () => {
   const currentUser = useSelector(state => state.auth.user.id);
   const history = useHistory();
   const dispatch = useDispatch();

   const useStyles = makeStyles(theme => ({
      root: {
         '& > *': {
            margin: theme.spacing(1),
         },
      },
      links: {
         color: 'white',
         textDecoration: 'none',
      },
   }));

   const classes = useStyles();

   const handleLogout = () => {
      dispatch(signOut());
      history.push('/login');
   };

   return (
      <div>
         {currentUser ? (
            <AppBar position="static">
               <Toolbar>
                  <Link to="/" className={classes.links}>
                     <Button color="inherit">Home</Button>
                  </Link>
                  <Link
                     to={`/${currentUser}/bookclubs`}
                     className={classes.links}
                  >
                     <Button color="inherit">My Bookclubs</Button>
                  </Link>
                  <Link to="/bookclubs" className={classes.links}>
                     <Button color="inherit">Create Bookclub</Button>
                  </Link>
                  <Button color="inherit" onClick={handleLogout}>
                     Logout
                  </Button>
               </Toolbar>
            </AppBar>
         ) : (
            <AppBar position="static">
               <Toolbar>
                  <Link to="/" className={classes.links}>
                     <Button color="inherit">Home</Button>
                  </Link>
                  <Link to="/login" className={classes.links}>
                     <Button color="inherit">Login</Button>
                  </Link>
               </Toolbar>
            </AppBar>
         )}
      </div>
   );
};

export default NavBar;
