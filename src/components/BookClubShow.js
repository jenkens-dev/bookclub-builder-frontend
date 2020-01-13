import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BookClubShow = ({ props, match }) => {
   const [bookclubs, setBookclubs] = useState('');
   const [fetched, setFetched] = useState(false);
   const [members, setMembers] = useState([]);
   const [isAdmin, setAdmin] = useState(false);
   const currentUser = useSelector(state => state.auth.user.id);
   const history = useHistory();
   const token = localStorage.getItem('token');

   //    console.log(bookClubDetails.id);
   //       console.log(currentUser);
   //       let members = users.map(user => {
   //          return user.id;
   //       });
   //       console.log(members.includes(currentUser));

   useEffect(() => {
      fetch(`http://localhost:3000/api/v1/bookclubs/${match.params.id}`)
         .then(response => response.json())
         .then(data => {
            setBookclubs(data);
            setMembers(data.users);
         })
         .finally(() => {
            console.log(members);
            // console.log(isMemberBoolean);
            // if (isMemberBoolean.length > 0) {
            //    setMember(true);
            // } else {
            //    setMember(false);
            // }
            setFetched(true);
         });
   }, []);

   if (!token || !currentUser) {
      history.push('/login');
   }

   if (!fetched) {
      return null;
   }

   const handleClick = () => {
      console.log('hi');
   };

   const isMember = () => {
      let temp = members.filter(member => member.id === currentUser);
      if (temp.length > 0) {
         return true;
      } else {
         return false;
      }
   };

   console.log(bookclubs);
   const { name, description, picture } = bookclubs;
   console.log(members);
   return (
      <div>
         <h1>{isMember() ? <div>Member</div> : <div>No</div>}</h1>
         <h1>{name}</h1>
         <button onClick={handleClick}>Join</button>
         <img src={picture} />
         <p>{description}</p>
      </div>
   );
};

export default BookClubShow;
