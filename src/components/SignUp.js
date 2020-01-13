import React, { useState } from 'react';
import { api } from '../services/api';
import { SIGN_IN as signIn } from '../actions/auth';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import S3FileUpload from 'react-s3';

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
            console.log(data.location);
            setPicture(data.location);
         })
         .catch(error => {
            alert(error);
         });
   };

   return (
      <div>
         <h1>Sign Up</h1>
         <form onSubmit={handleSubmit}>
            <label>
               Username
               <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
               />
            </label>
            <label>
               Password
               <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
               />
            </label>
            <input
               hidden
               accept="image/*"
               id="raised-button-file"
               multiple
               type="file"
               onChange={upload}
            />
            <label htmlFor="raised-button-file">
               <Button component="span">Upload</Button>
            </label>
            <input type="submit" />
         </form>
      </div>
   );
};

export default SignUp;
