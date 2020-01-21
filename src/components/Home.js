import React from 'react';
import { api } from '../services/api';
import BookClubCard from './BookClubCard';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


const Home = () => {
   const [bookclubs, fetched] = api.useNetworkResource(
      'http://localhost:3000/api/v1/bookclubs',
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
   });

   const classes = useStyles();

   if (!token) {
      history.push('/login');
   }

   if (!fetched) {
      return null;
   }

   return (
      <div>
         <h1>BookClub Builder</h1>
         <div className={classes.root}>
            {bookclubs.map(bookclub => (
               <BookClubCard key={bookclub.id} bookclub={bookclub} />
            ))}
         </div>
      </div>
   );
};

export default Home;
