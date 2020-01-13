import React from 'react';
import { api } from '../services/api';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BookClubShow = ({ props, match }) => {
   const user = useSelector(state => state.auth.user.id);
   const history = useHistory();
   const token = localStorage.getItem('token');

   console.log(user);

   if (!token || !user) {
      history.push('/login');
   }

   const [bookClubDetails, fetched] = api.useNetworkResource(
      `http://localhost:3000/api/v1/bookclubs/${match.params.id}`,
   );

   if (!fetched) {
      return null;
   }

   const handleClick = () => {
      console.log(bookClubDetails.id);
      console.log(user);
   };

   console.log(bookClubDetails);
   const { name, description, picture } = bookClubDetails;
   return (
      <div>
         <h1>{name}</h1>
         <button onClick={handleClick}>Join</button>
         <img src={picture} />
         <p>{description}</p>
      </div>
   );
};

export default BookClubShow;
