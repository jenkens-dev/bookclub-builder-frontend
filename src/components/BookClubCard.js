import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const BookClubCard = props => {
   const { id, name, picture, description, users } = props.bookclub;
   return (
      <Card>
         <CardActionArea>
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
