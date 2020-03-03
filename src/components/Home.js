import React from 'react';
import { api } from '../services/api';
import BookClubCard from './BookClubCard';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../logo.png';
import bookLoader from '../Book_Loading.gif';

const Home = () => {
   const [bookclubs, fetched] = api.useNetworkResource(
      `https://bookclub-builder-server.herokuapp.com/api/v1/bookclubs`,
   );

   const history = useHistory();

   const token = localStorage.getItem('token');

   const useStyles = makeStyles({
      root: {
         display: 'flex',
         flexWrap: 'wrap',
         justifyContent: 'center',
         alignContent: 'center',
         height: '100%',
      },
      flex: {
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'center',
         alignContent: 'center',
         minHeight: '100vh',
      },
      image: {
         objectFit: 'none',
      },
   });

   const classes = useStyles();

   if (!token) {
      history.push('/login');
   }

   if (!fetched) {
      return (
         <div className={classes.flex}>
            {/* <img src={logo} alt="logo" /> */}
            <img
               src={bookLoader}
               className={classes.image}
               alt="loading icon"
            />
         </div>
      );
   }

   return (
      <div className={classes.root}>
         <img src={logo} alt="logo" />
         <div className={classes.root}>
            {bookclubs.map(bookclub => (
               <BookClubCard key={bookclub.id} bookclub={bookclub} />
            ))}
         </div>
      </div>
   );
};

export default Home;
