import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CURRENT_POLL as currentPoll } from '../actions/poll';
import PollShow from './PollShow';
import AdminOptions from './AdminOptions';
import MemberOptions from './MemberOptions';
import BookModal from './BookModal';

const BookClubShow = ({ props, match }) => {
   const [bookclubs, setBookclubs] = useState('');
   const [fetched, setFetched] = useState(false);
   const dispatch = useDispatch();
   const poll = useSelector(state => state.poll.poll);
   const currentUser = useSelector(state => state.auth.user.id);
   const history = useHistory();
   const token = localStorage.getItem('token');

   useEffect(() => {
      fetch(`http://localhost:3000/api/v1/bookclubs/${match.params.id}`)
         .then(response => response.json())
         .then(data => {
            setBookclubs(data);
            dispatch(currentPoll(data.poll[0]));
         })
         .finally(() => {
            setFetched(true);
         });
   }, [match.params.id]);

   if (!token || !currentUser) {
      history.push('/login');
   }

   if (!fetched) {
      return null;
   }

   const isAdmin = () => {
      return bookclubs.bookclub.bookclub_users[0].is_admin === currentUser;
   };

   const { name, description, picture } = bookclubs.bookclub;

   return (
      <div>
         <div>
            <h1>{name}</h1>
            {isAdmin() ? <AdminOptions /> : <MemberOptions />}
            <img src={picture} alt="bookclub" />
            <p>{description}</p>
            {poll ? <PollShow /> : null}
         </div>
         <BookModal />
      </div>
   );
};

export default BookClubShow;
