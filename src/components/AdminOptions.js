import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CURRENT_POLL as currentPoll } from '../actions/poll';
import { ARCHIVE_POLL as archivePoll } from '../actions/poll';

const AdminOptions = () => {
   const id = useSelector(state => state.bookclub.bookclub.id);
   const poll = useSelector(state => state.poll.poll);
   const dispatch = useDispatch();

   const handleClick = () => {
      fetch(`http://localhost:3000/api/v1/polls/${poll.id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
         },
         body: JSON.stringify({
            active: false,
         }),
      })
         .then(response => response.json())
         .then(data => {
            dispatch(archivePoll(data));
         });
   };

   console.log(poll);
   return (
      <div>
         {!poll || poll.poll_options.length < 1 ? (
            <Link to={`/bookclubs/${id}/poll`}>
               <button>Create Poll</button>
            </Link>
         ) : (
            <button onClick={handleClick}>Archive Poll</button>
         )}

         <Link to={`/bookclubs/${id}/edit`}>
            <button>Edit Bookclub</button>
         </Link>
      </div>
   );
};

export default AdminOptions;
