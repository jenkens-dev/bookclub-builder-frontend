import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ARCHIVE_POLL as archivePoll } from '../actions/poll';
import { makeStyles } from '@material-ui/core/styles';

const AdminOptions = () => {
   const id = useSelector(state => state.bookclub.bookclub.id);
   const poll = useSelector(state => state.poll.poll);
   const dispatch = useDispatch();

   const useStyles = makeStyles({
      links: {
         color: 'white',
         textDecoration: 'none',
      },
   });

   const classes = useStyles();

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
            <Link to={`/bookclubs/${id}/poll`} className={classes.links}>
               <Button variant="contained" color="primary">
                  Create Poll
               </Button>
            </Link>
         ) : (
            <Button
               variant="contained"
               color="primary"
               onClick={handleClick}
               className={classes.links}
            >
               Archive Poll
            </Button>
         )}

         <Link to={`/bookclubs/${id}/edit`} className={classes.links}>
            <Button variant="contained" color="primary">
               Edit Bookclub
            </Button>
         </Link>
      </div>
   );
};

export default AdminOptions;
