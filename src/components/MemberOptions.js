import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_USER as updateUser } from '../actions/bookclub';

const MemberOptions = () => {
   const bookclub = useSelector(state => state.bookclub.bookclub);
   const currentUser = useSelector(state => state.auth.user);
   const dispatch = useDispatch();

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
      fetch(`http://localhost:3000/api/v1/bookclub_users/id`, {
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
      fetch(`http://localhost:3000/api/v1/bookclub_users`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
         },
         body: JSON.stringify({
            bookclub_id: bookclub.id,
            user_id: currentUser.id,
         }),
      });
   };

   return (
      <div>
         {isMember() ? (
            <button onClick={leaveBookClub}>Leave Bookclub</button>
         ) : (
            <button onClick={joinBookClub}>Join Bookclub</button>
         )}
      </div>
   );
};

export default MemberOptions;
