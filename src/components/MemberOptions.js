import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_USER as addUser } from '../actions/bookclub';

const MemberOptions = () => {
   const bookclub = useSelector(state => state.bookclub.bookclub);
   const currentUser = useSelector(state => state.auth.user);
   console.log(currentUser);
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

   const leaveBookClub = () => {};

   const joinBookClub = () => {
      bookclub.users.push(currentUser);
      dispatch(addUser(bookclub.users));
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
