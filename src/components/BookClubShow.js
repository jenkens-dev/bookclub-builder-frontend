import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminOptions from './AdminOptions';
import MemberOptions from './MemberOptions';

const BookClubShow = ({ props, match }) => {
   const [bookclubs, setBookclubs] = useState('');
   const [fetched, setFetched] = useState(false);
   const [members, setMembers] = useState([]);
   const currentUser = useSelector(state => state.auth.user.id);
   const history = useHistory();
   const token = localStorage.getItem('token');

   useEffect(() => {
      fetch(`http://localhost:3000/api/v1/bookclubs/${match.params.id}`)
         .then(response => response.json())
         .then(data => {
            setBookclubs(data);
            setMembers(data.users);
         })
         .finally(() => {
            console.log(members);
            setFetched(true);
         });
   }, []);

   if (!token || !currentUser) {
      history.push('/login');
   }

   if (!fetched) {
      return null;
   }

   const isMember = () => {
      let isMemberArray = members.filter(member => member.id === currentUser);
      if (isMemberArray.length > 0) {
         return true;
      } else {
         return false;
      }
   };

   const isAdmin = () => {
      return bookclubs.bookclub_users[0].is_admin === currentUser;
   };

   const { name, description, picture } = bookclubs;

   return (
      <div>
         <h1>{name}</h1>
         {isAdmin ? <AdminOptions /> : <MemberOptions />}
         <img src={picture} />
         <p>{description}</p>
      </div>
   );
};

export default BookClubShow;
