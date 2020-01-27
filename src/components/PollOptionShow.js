import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_OPTION as createOption } from '../actions/poll';

const PollOptionShow = props => {
   const poll = useSelector(state => state.poll.poll);
   const dispatch = useDispatch();

   const useStyles = makeStyles({
      card: {
         minWidth: '30%',
         maxWidth: '30%',
         margin: 10,
      },
      media: {
         height: 345,
         width: '100%',
         objectFit: 'contain',
      },
   });

   const classes = useStyles();

   const handleClick = () => {
      fetch(`https://bookclub-builder-server.herokuapp.com/api/v1/polls/${poll.id}/options`, {
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
            props.notify(`${props.option.volumeInfo.title}`);
         });
   };

   return (
      <Card className={classes.card}>
         <CardActionArea onClick={handleClick} className={classes.action}>
            <CardMedia
               className={classes.media}
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
