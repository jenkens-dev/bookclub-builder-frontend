import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CURRENT_POLL as currentPoll } from '../actions/poll';
import PollShow from './PollShow';
import AdminOptions from './AdminOptions';
import MemberOptions from './MemberOptions';
import BookModal from './BookModal';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const BookClubShow = ({ props, match }) => {
   const bookclub = useSelector(state => state.bookclub.bookclub);
   const users = useSelector(state => state.bookclub.bookclub.users);
   const [bookclubUsers, setBookclubUsers] = useState('');
   const [fetched, setFetched] = useState(false);
   const dispatch = useDispatch();
   const poll = useSelector(state => state.poll.poll);
   const currentUser = useSelector(state => state.auth.user);
   const history = useHistory();
   const token = localStorage.getItem('token');

   const useStyles = makeStyles({
      root: {
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
         height: '100%',
         marginLeft: 25,
         marginRight: 25,
      },
      image: {
         height: '40%',
         width: '40%',
      },
   });

   const classes = useStyles();

   useEffect(() => {
      fetch(
         `https://bookclub-builder-server.herokuapp.com/api/v1/bookclubs/${match.params.id}`,
      )
         .then(response => response.json())
         .then(data => {
            setBookclubUsers(data);
            dispatch(currentPoll(data.poll[0]));
         })
         .finally(() => {
            setFetched(true);
         });
   }, [match.params.id, dispatch]);

   if (!token || !currentUser.id) {
      history.push('/login');
   }

   if (!fetched) {
      return null;
   }

   const isAdmin = () => {
      return (
         bookclubUsers.bookclub.bookclub_users[0].is_admin === currentUser.id
      );
   };

   const isMember = () => {
      let temp = bookclub.users.filter(user => {
         return user.id === currentUser.id;
      });
      if (temp.length > 0) {
         return true;
      }
      return false;
   };

   const { name, description, picture } = bookclub;

   return (
      <div>
         <div className={classes.root}>
            <h1>{name}</h1>
            {isAdmin() ? <AdminOptions /> : <MemberOptions />}
            <img src={picture} alt="bookclub" className={classes.image} />
            <h1>Members</h1>
            <AvatarGroup>
               {users.map(user => {
                  return (
                     <Tooltip title={user.username} key={user.id}>
                        <Avatar
                           alt={user.username}
                           src={user.profile_picture}
                           key={user.id}
                        />
                     </Tooltip>
                  );
               })}
            </AvatarGroup>
            <p>{description}</p>
            {poll && isMember() ? <PollShow /> : null}
         </div>
         <BookModal />
      </div>
   );
};

export default BookClubShow;
