import React from 'react';
import { api } from '../services/api';
import { useDispatch } from 'react-redux';
import { CURRENT_BOOK as currentBook } from '../actions/book';
import { TOGGLE_MODAL_STATUS as toggleModalStatus } from '../actions/modal';

const PollVote = ({ option: { id, google_book_id, votes } }) => {
   const [bookInfo, fetched] = api.useNetworkResource(
      `https://www.googleapis.com/books/v1/volumes/${google_book_id}`,
   );
   const dispatch = useDispatch();

   const handleBookState = () => {
      dispatch(currentBook(bookInfo));
      dispatch(toggleModalStatus(true));
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
