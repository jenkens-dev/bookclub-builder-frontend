import React from 'react';
import { api } from '../services/api';
import { useDispatch } from 'react-redux';
import { CURRENT_BOOK as currentBook } from '../actions/book';
import { TOGGLE_MODAL_STATUS as toggleModalStatus } from '../actions/modal';
import { CURRENT_POLL as currentPoll } from '../actions/poll';

const PollVote = ({ option: { id, google_book_id, votes } }) => {
   const [bookInfo, fetched] = api.useNetworkResource(
      `https://www.googleapis.com/books/v1/volumes/${google_book_id}`,
   );
   const dispatch = useDispatch();

   const handleBookState = () => {
      dispatch(currentBook(bookInfo));
      dispatch(toggleModalStatus(true));
   };

   const handleVoteClick = () => {
      let increasedVote = votes + 1;
      fetch(`http://localhost:3000/api/v1/poll_options/${id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
         },
         body: JSON.stringify({
            increasedVote,
         }),
      })
         .then(response => response.json())
         .then(data => {
            console.log(data);
            dispatch(currentPoll(data));
         });
   };

   if (!fetched) {
      return null;
   }

   return (
      <>
         <span onClick={handleBookState}>{bookInfo.volumeInfo.title}</span>
         <p>Votes: {votes}</p>
         <button onClick={handleVoteClick}>Vote</button>
      </>
   );
};

export default PollVote;
