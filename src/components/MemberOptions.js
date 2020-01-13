import React from 'react';
import { useSelector } from 'react-redux';

const MemberOptions = () => {
   const users = useSelector(state => state.bookclub.bookclub.users);
   const currentUser = useSelector(state => state.auth.user.id);
   console.log(users);

   const isMember = () => {
      let temp = users.filter(user => {
         return user.id === currentUser;
      });
      if (temp.length > 0) {
         return true;
      }
      return false;
   };

   return (
      <div>
         {isMember() ? (
            <button>Leave Bookclub</button>
         ) : (
            <button>Join Bookclub</button>
         )}
      </div>
   );
};

export default MemberOptions;
