import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import S3FileUpload from 'react-s3';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import { CURRENT_BOOKCLUB as currentBookclub } from '../actions/bookclub';

const EditBookClub = () => {
   const bookclubId = useSelector(state => state.bookclub.bookclub.id);
   const history = useHistory();
   const dispatch = useDispatch();

   const [picture, setPicture] = useState(
      useSelector(state => state.bookclub.bookclub.picture),
   );
   const [name, setName] = useState(
      useSelector(state => state.bookclub.bookclub.name),
   );
   const [description, setDescription] = useState(
      useSelector(state => state.bookclub.bookclub.description),
   );

   const useStyles = makeStyles(theme => ({
      input: {
         display: 'none',
      },
      margin: {
         margin: '5px',
      },
      image: {
         height: '50%',
         width: '50%',
      },
   }));

   const classes = useStyles();

   const config = {
      bucketName: 'bookclub-photos',
      region: 'us-west-2',
      accessKeyId: process.env.REACT_APP_BOOKCLUB_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_BOOKCLUB_SECRET_ACCESS_KEY,
   };

   const upload = e => {
      S3FileUpload.uploadFile(e.target.files[0], config)
         .then(data => {
            setPicture(data.location);
         })
         .catch(error => {
            alert(error);
         });
   };

   const handleNameChange = event => {
      setName(event.target.value);
   };

   const handleDescriptionChange = event => {
      setDescription(event.target.value);
   };

   const handleSubmit = event => {
      event.preventDefault();
      fetch(`http://localhost:3000/api/v1/bookclubs/${bookclubId}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
         },
         body: JSON.stringify({
            name,
            picture,
            description,
         }),
      })
         .then(response => response.json())
         .then(data => {
            console.log(data);
            dispatch(currentBookclub(data));
            //need to update redux store but data is undefined for some reason
            history.push(`/bookclubs/${bookclubId}`);
         });
   };

   return (
      <div>
         <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            marginTop="5px"
         >
            <form onSubmit={handleSubmit}>
               <Box display="flex" justifyContent="center">
                  <Box className={classes.margin}>
                     <TextField
                        required
                        id="name"
                        label="Name"
                        value={name}
                        onChange={handleNameChange}
                        variant="filled"
                     />
                  </Box>
                  <Box className={classes.margin}>
                     <TextField
                        required
                        id="description"
                        label="Description"
                        value={description}
                        onChange={handleDescriptionChange}
                        variant="filled"
                     />
                  </Box>
               </Box>
               <Box display="flex" justifyContent="center">
                  <img
                     src={picture}
                     alt="bookclub"
                     style={{ maxHeight: '100vh', maxWidth: '100vh' }}
                  />
               </Box>
               <Box display="flex" justifyContent="center">
                  <Box className={classes.margin}>
                     <input
                        className={classes.input}
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={upload}
                     />
                     <label htmlFor="contained-button-file">
                        <Button
                           variant="contained"
                           color="primary"
                           component="span"
                           startIcon={<CloudUploadIcon />}
                        >
                           Upload
                        </Button>
                     </label>
                  </Box>
                  <Box className={classes.margin}>
                     <Button type="submit" variant="contained" color="primary">
                        Submit
                     </Button>
                  </Box>
               </Box>
            </form>
         </Box>
      </div>
   );
};

export default EditBookClub;
