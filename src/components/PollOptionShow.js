import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const PollOptionShow = props => {
   const dispatch = useDispatch();
   const history = useHistory();
   console.log(props);

   const handleClick = () => {
       
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
