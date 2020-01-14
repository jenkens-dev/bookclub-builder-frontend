import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminOptions from './AdminOptions';
import MemberOptions from './MemberOptions';

const BookClubShow = ({ props, match }) => {
   const [bookclubs, setBookclubs] = useState('');
   const [fetched, setFetched] = useState(false);
   const currentUser = useSelector(state => state.auth.user.id);
   const history = useHistory();
   const token = localStorage.getItem('token');

   useEffect(() => {
      fetch(`http://localhost:3000/api/v1/bookclubs/${match.params.id}`)
         .then(response => response.json())
         .then(data => {
            setBookclubs(data);
         })
         .finally(() => {
            setFetched(true);
         });
   }, []);

   if (!token || !currentUser) {
      history.push('/login');
   }

   if (!fetched) {
      return null;
   }

   const isAdmin = () => {
      return bookclubs.bookclub_users[0].is_admin === currentUser;
   };

   const { name, description, picture } = bookclubs;

   return (
      <div>
         <h1>{name}</h1>
         {isAdmin() ? <AdminOptions /> : <MemberOptions />}
         <img src={picture} />
         <p>{description}</p>
      </div>
   );
};

export default BookClubShow;
