import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_OPTION as createOption } from '../actions/poll';

const PollOptionShow = props => {
   const poll = useSelector(state => state.poll.poll);
   const bookclub = useSelector(state => state.bookclub.bookclub);
   const dispatch = useDispatch();
   const history = useHistory();

   const handleClick = () => {
      fetch(`http://localhost:3000/api/v1/polls/${poll.id}/options`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
         },
         body: JSON.stringify({
            google_book_id: props.option.id,
            poll_id: poll.id,
            votes: 0,
         }),
      })
         .then(response => response.json())
         .then(data => {
            dispatch(createOption(props.option));
         });
   };

   return (
      <Card>
         <CardActionArea onClick={handleClick}>
            <CardMedia
               component="img"
               alt={`${props.option.volumeInfo.title} book`}
               height="140"
               image={props.option.volumeInfo.imageLinks.smallThumbnail}
               title={props.option.volumeInfo.title}
            />
            <CardContent>
               <Typography gutterBottom variant="h5" component="h2">
                  {props.option.volumeInfo.title}
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p">
                  {props.option.volumeInfo.description}
               </Typography>
            </CardContent>
         </CardActionArea>
      </Card>
   );
};

export default PollOptionShow;
