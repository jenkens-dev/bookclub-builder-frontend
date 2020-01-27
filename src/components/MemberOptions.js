import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_USER as updateUser } from '../actions/bookclub';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const MemberOptions = () => {
   const bookclub = useSelector(state => state.bookclub.bookclub);
   const currentUser = useSelector(state => state.auth.user);
   const dispatch = useDispatch();

   const useStyles = makeStyles({
      btn: {
         margin: 5,
      },
   });

   const classes = useStyles();

   const isMember = () => {
      let temp = bookclub.users.filter(user => {
         return user.id === currentUser.id;
      });
      if (temp.length > 0) {
         return true;
      }
      return false;
   };

   const leaveBookClub = () => {
      let index = bookclub.users.findIndex(user => user.id === currentUser.id);
      bookclub.users.splice(index, 1);
      fetch(`/api/v1/bookclub_users/id`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
         },
         body: JSON.stringify({
            bookclub_id: bookclub.id,
            user_id: currentUser.id,
         }),
      }).then(response => {
         if (!response.error) {
            dispatch(updateUser(bookclub.users));
         }
      });
   };

   const joinBookClub = () => {
      bookclub.users.push(currentUser);
      dispatch(updateUser(bookclub.users));
      fetch(`/api/v1/bookclub_users`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
         },
         body: JSON.stringify({
            bookclub_id: bookclub.id,
            user_id: currentUser.id,
         }),
      })
         .then(response => response.json())
         .then(data => {
         });
   };

   return (
      <div>
         {isMember() ? (
            <Button
               variant="contained"
               color="primary"
               onClick={leaveBookClub}
               className={classes.btn}
            >
               Leave Bookclub
            </Button>
         ) : (
            <Button
               variant="contained"
               color="primary"
               onClick={joinBookClub}
               className={classes.btn}
            >
               Join Bookclub
            </Button>
         )}
      </div>
   );
};

export default MemberOptions;
