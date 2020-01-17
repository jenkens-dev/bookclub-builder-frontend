import React from 'react';
import { api } from '../services/api';

const PollVote = ({ option: { id, google_book_id, votes } }) => {
   console.log(id, google_book_id, votes);
   const [bookInfo, fetched] = api.useNetworkResource(
      `https://www.googleapis.com/books/v1/volumes/${google_book_id}`,
   );

   const handleBookState = () => {
      //dispatch current selected book
      //dispatch modal state
   };

   if (!fetched) {
      return null;
   }

   console.log(bookInfo);

   return (
      <div>
         <div onClick={handleBookState}>{bookInfo.volumeInfo.title}</div>
      </div>
   );
};

export default PollVote;
