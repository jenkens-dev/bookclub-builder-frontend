import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CREATE_POLL as createPoll } from '../actions/poll';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

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
         <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
         >
            <h1>Create Poll for {bookclub.name}</h1>
            <form onSubmit={handleSubmit}>
               <Box>
                  <TextField
                     required
                     id="title"
                     label="Title"
                     value={title}
                     onChange={handleChange}
                     variant="filled"
                     style={{ marginTop: '5px', marginBottom: '5px' }}
                  />
               </Box>
               <Box>
                  <Button type="submit" variant="contained" color="primary">
                     Submit
                  </Button>
               </Box>
            </form>
         </Box>
      </div>
   );
};

export default CreatePoll;
