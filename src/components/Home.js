import React from 'react';
import { api } from '../services/api';
import BookClubCard from './BookClubCard';

const Home = () => {
   const [bookclubs, fetched] = api.useNetworkResource(
      'http://localhost:3000/api/v1/bookclubs',
   );

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
