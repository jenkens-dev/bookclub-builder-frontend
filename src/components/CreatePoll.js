import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CREATE_POLL as createPoll } from '../actions/poll';

const CreatePoll = () => {
   const bookclub = useSelector(state => state.bookclub.bookclub);
   const [title, setTitle] = useState('');
   const dispatch = useDispatch();
   const history = useHistory();

   const handleChange = event => {
      setTitle(event.target.value);
   };

   const handleSubmit = event => {
      event.preventDefault();
      fetch(`http://localhost:3000/api/v1/polls`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
         },
         body: JSON.stringify({
            name: title,
            bookclub_id: bookclub.id,
         }),
      })
         .then(response => response.json())
         .then(data => {
            dispatch(createPoll(data));
            history.push(`/bookclubs/${bookclub.id}/${data.id}/options`);
         });
   };

   return (
      <div>
         <div>Create Poll for {bookclub.name}</div>
         <form onSubmit={handleSubmit}>
            <label>
               Title
               <input type="text" value={title} onChange={handleChange} />
               <input type="submit" />
            </label>
         </form>
      </div>
   );
};

export default CreatePoll;
