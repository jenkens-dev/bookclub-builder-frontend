import React from 'react';
import { api } from '../services/api';

const BookClubShow = ({ props, match }) => {
   const [bookClubDetails, fetched] = api.useNetworkResource(
      `http://localhost:3000/api/v1/bookclubs/${match.params.id}`,
   );

   if (!fetched) {
      return null;
   }

   console.log(bookClubDetails);
   const { name, description, picture } = bookClubDetails;
   return (
      <div>
         <h1>{name}</h1>
         <img src={picture} />
         <p>{description}</p>
      </div>
   );
};

export default BookClubShow;
