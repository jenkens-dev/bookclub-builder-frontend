import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import S3FileUpload from 'react-s3';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


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
      fetch(`http://localhost:3000/api/v1/bookclubs`, {
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
      })
         .then(response => response.json())
         .then(data => {
            history.push('/');
         });
   };

   return (
      <Grid container direction="column" justify="center" alignItems="center">
         <h1>Create Bookclub</h1>
         <form onSubmit={handleSubmit}>
            <Grid item xs={6}>
               <TextField
                  required
                  id="name"
                  label="Name"
                  value={name}
                  onChange={handleNameChange}
                  variant="filled"
               />
            </Grid>
            <Grid item xs={6}>
               <TextField
                  required
                  id="description"
                  label="Description"
                  value={description}
                  onChange={handleDescriptionChange}
                  variant="filled"
               />
            </Grid>
            <Grid item xs={12}>
               <img
                  src={picture}
                  alt="bookclub"
                  style={{ maxHeight: '100vh', maxWidth: '100vh' }}
               />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
               <Button type="submit" variant="contained" color="primary">
                  Submit
               </Button>
            </Grid>
         </form>
      </Grid>
   );
};

export default CreateBookClub;
