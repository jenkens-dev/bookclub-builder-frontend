import React, { useState } from 'react';
import { api } from '../services/api';
import { SIGN_IN as signIn } from '../actions/auth';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import S3FileUpload from 'react-s3';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';

const SignUp = props => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [picture, setPicture] = useState('https://i.imgur.com/VfFU5d8.jpg');

   const dispatch = useDispatch();

   const config = {
      bucketName: 'bookclub-photos',
      region: 'us-west-2',
      accessKeyId: process.env.REACT_APP_BOOKCLUB_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_BOOKCLUB_SECRET_ACCESS_KEY,
   };

   const useStyles = makeStyles(theme => ({
      root: {
         '& > *': {
            margin: theme.spacing(1),
         },
      },
      input: {
         display: 'none',
         margin: '5px',
      },
   }));

   const classes = useStyles();

   const handleUsernameChange = e => {
      setUsername(e.target.value);
   };

   const handlePasswordChange = e => {
      setPassword(e.target.value);
   };

   const handleSubmit = e => {
      e.preventDefault();
      api.auth.signup({ username, password, picture }).then(response => {
         if (response.error) {
            console.log(response.error);
         } else {
            dispatch(signIn(response));
            localStorage.setItem('token', response.jwt);
            props.history.push('/');
         }
      });
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

   return (
      <Grid
         container
         direction="column"
         justify="center"
         alignItems="center"
         alignContent="center"
         spacing={2}
      >
         <h1>Sign Up</h1>
         <form onSubmit={handleSubmit}>
            <Grid item xs={12}>
               <TextField
                  required
                  id="username"
                  label="Username"
                  value={username}
                  onChange={handleUsernameChange}
                  variant="filled"
               />
            </Grid>
            <Grid item xs={12}>
               <TextField
                  required
                  type="password"
                  id="password"
                  label="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  variant="filled"
               />
            </Grid>
            <Grid item xs={12} style={{ marginTop: 10, marginBottom: 10 }}>
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

export default SignUp;
