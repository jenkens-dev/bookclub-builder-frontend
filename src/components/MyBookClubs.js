import React from 'react';
import { api } from '../services/api';
import { useSelector } from 'react-redux';
import BookClubCard from './BookClubCard';
import { useHistory } from 'react-router-dom';

const MyBookClubs = () => {
   const currentUserId = useSelector(state => state.auth.user.id);
   const [mybookclubs, fetched] = api.useNetworkResource(
      `http://localhost:3000/api/v1/${currentUserId}/bookclubs`,
   );

   const token = localStorage.getItem('token');
   const history = useHistory();

   if (!token) {
      history.push('/login');
   }

   if (!fetched) {
      return null;
   }

   return (
      <div>
         <div>MyBookClubs</div>
         {mybookclubs.map(bookclub => (
            <BookClubCard key={bookclub.id} bookclub={bookclub} />
         ))}
      </div>
   );
};

export default MyBookClubs;
