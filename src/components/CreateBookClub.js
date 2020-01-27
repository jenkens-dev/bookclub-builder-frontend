import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import S3FileUpload from 'react-s3';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const CreateBookClub = () => {
   const currentUserId = useSelector(state => state.auth.user.id);
   const history = useHistory();
   const [picture, setPicture] = useState('https://i.imgur.com/WXw2KKe.jpg');
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');

   const config = {
      bucketName: 'bookclub-photos',
      region: 'us-west-2',
      accessKeyId: process.env.REACT_APP_BOOKCLUB_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_BOOKCLUB_SECRET_ACCESS_KEY,
   };

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
      fetch(
         `https://bookclub-builder-server.herokuapp.com/
      api/v1/bookclubs`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               Accepts: 'application/json',
            },
            body: JSON.stringify({
               name,
               picture,
               description,
               id: currentUserId,
            }),
         },
      )
         .then(response => response.json())
         .then(data => {
            history.push('/');
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
            <h1>Create Bookclub</h1>
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
               <Box
                  display="flex"
                  justifyContent="center"
                  className={classes.margin}
               >
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

export default CreateBookClub;
