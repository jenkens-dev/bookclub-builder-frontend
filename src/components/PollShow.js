import React from 'react';
import { useSelector } from 'react-redux';
import PollVote from './PollVote';
import Grid from '@material-ui/core/Grid';

const PollShow = () => {
   const poll = useSelector(state => state.poll.poll);

   const displayPollOptions = () => {
      return poll.poll_options.map(option => {
         return <PollVote key={option.id} option={option} />;
      });
   };

   return (
      <Grid container direction="column" justify="center" alignItems="center">
         <h1>{poll.name}</h1>
         {poll.poll_options.length > 0 && <>{displayPollOptions()}</>}
      </Grid>
   );
};

export default PollShow;
