import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { CURRENT_BOOKCLUB as currentBookclub } from '../actions/bookclub';
import { useDispatch } from 'react-redux';

const BookClubCard = props => {
   const { id, name, picture, description, users } = props.bookclub;
   const dispatch = useDispatch();
   const history = useHistory();

   const handleClick = () => {
      dispatch(currentBookclub(props.bookclub));
      history.push(`/bookclubs/${id}`);
   };

   return (
      <Card>
         <CardActionArea onClick={handleClick}>
            <CardMedia
               component="img"
               alt={`${name} bookclub`}
               height="140"
               image={picture}
               title={name}
            />
            <CardContent>
               <Typography gutterBottom variant="h5" component="h2">
                  {name}
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p">
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
