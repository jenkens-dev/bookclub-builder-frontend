import React from 'react';
import { api } from '../services/api';
import { useSelector } from 'react-redux';
import BookClubCard from './BookClubCard';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const MyBookClubs = () => {
   const currentUserId = useSelector(state => state.auth.user.id);
   const [mybookclubs, fetched] = api.useNetworkResource(
      `https://bookclub-builder-server.herokuapp.com/
      api/v1/${currentUserId}/bookclubs`,
   );

   const token = localStorage.getItem('token');
   const history = useHistory();

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
         <h1>MyBookClubs</h1>
         <div className={classes.root}>
            {mybookclubs.map(bookclub => (
               <BookClubCard key={bookclub.id} bookclub={bookclub} />
            ))}
         </div>
      </div>
   );
};

export default MyBookClubs;
