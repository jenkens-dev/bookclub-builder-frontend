import React from 'react';
import { api } from '../services/api';
import BookClubCard from './BookClubCard';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
   const [bookclubs, fetched] = api.useNetworkResource(
      'http://localhost:3000/api/v1/bookclubs',
   );

   const history = useHistory();

   const token = localStorage.getItem('token');

   if (!token) {
      history.push('/login');
   }

   if (!fetched) {
      return null;
   }

   return (
      <div>
         <h1>BookClub Builder</h1>
         {bookclubs.map(bookclub => (
            <BookClubCard key={bookclub.id} bookclub={bookclub} />
         ))}
      </div>
   );
};

export default Home;
