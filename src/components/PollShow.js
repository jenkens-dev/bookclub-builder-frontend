import React from 'react';
import { useSelector } from 'react-redux';
import PollVote from './PollVote';

const PollShow = () => {
   const poll = useSelector(state => state.poll.poll);

   const displayPollOptions = () => {
      return poll.poll_options.map(option => {
         return <PollVote key={option.id} google_id={option.google_book_id} />;
      });
   };

   console.log(poll);
   return (
      <div>
         <h1>{poll.name}</h1>
         <div>{displayPollOptions()}</div>
      </div>
   );
};

export default PollShow;
