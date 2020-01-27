import React from 'react';
import { api } from '../services/api';
import { useDispatch } from 'react-redux';
import { CURRENT_BOOK as currentBook } from '../actions/book';
import { TOGGLE_MODAL_STATUS as toggleModalStatus } from '../actions/modal';
import { CURRENT_POLL as currentPoll } from '../actions/poll';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import NavigationIcon from '@material-ui/icons/Navigation';
import Grid from '@material-ui/core/Grid';

const PollVote = ({ option: { id, google_book_id, votes } }) => {
   const [bookInfo, fetched] = api.useNetworkResource(
      `https://www.googleapis.com/books/v1/volumes/${google_book_id}`,
   );
   const dispatch = useDispatch();

   const useStyles = makeStyles(theme => ({
      margin: {
         margin: theme.spacing(1),
      },
      extendedIcon: {
         marginRight: theme.spacing(1),
      },
   }));

   const classes = useStyles();

   const handleBookState = () => {
      dispatch(currentBook(bookInfo));
      dispatch(toggleModalStatus(true));
   };

   const handleVoteClick = () => {
      let increasedVote = votes + 1;
      fetch(`https://bookclub-builder-server.herokuapp.com/
      api/v1/poll_options/${id}`, {
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
            dispatch(currentPoll(data));
         });
   };

   if (!fetched) {
      return null;
   }

   return (
      <Grid
         container
         direction="row"
         justify="center"
         alignItems="center"
         spacing={3}
      >
         <Grid item>
            <Fab
               variant="extended"
               size="small"
               aria-label="add"
               className={classes.margin}
               onClick={handleBookState}
            >
               <NavigationIcon className={classes.extendedIcon} />
               {bookInfo.volumeInfo.title}
            </Fab>
         </Grid>
         <Grid item>
            <p>Votes: {votes}</p>
         </Grid>
         <Grid item>
            <Button
               onClick={handleVoteClick}
               variant="contained"
               color="primary"
            >
               Vote
            </Button>
         </Grid>
      </Grid>
   );
};

export default PollVote;
