import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { CURRENT_BOOKCLUB as currentBookclub } from '../actions/bookclub';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const BookClubCard = props => {
   const { id, name, picture, description, users } = props.bookclub;
   const dispatch = useDispatch();
   const history = useHistory();

   const useStyles = makeStyles({
      card: {
         minHeight: '100%',
         minWidth: '30%',
         maxWidth: '30%',
         margin: 10,
      },
      media: {
         height: 345,
         width: '100%',
         objectFit: 'cover',
      },
   });

   const classes = useStyles();

   const handleClick = () => {
      dispatch(currentBookclub(props.bookclub));
      history.push(`/bookclubs/${id}`);
   };

   return (
      <Card className={classes.card}>
         <CardActionArea onClick={handleClick} minHeight={'100%'}>
            <CardMedia
               className={classes.media}
               component="img"
               alt={`${name} bookclub`}
               image={picture}
               title={name}
            />
            <CardContent>
               <Typography variant="h5" component="h2">
                  {name}
               </Typography>
               <Typography variant="body1" color="textSecondary" component="p">
                  {description}
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p">
                  {`${users.length} Member(s)`}
               </Typography>
            </CardContent>
         </CardActionArea>
      </Card>
   );
};

export default BookClubCard;
