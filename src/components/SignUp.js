import React, { useState } from 'react';
import { api } from '../services/api';
import { SIGN_IN as signIn } from '../actions/auth';
import { useDispatch } from 'react-redux';

const SignUp = props => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const dispatch = useDispatch();

   const handleUsernameChange = e => {
      setUsername(e.target.value);
   };

   const handlePasswordChange = e => {
      setPassword(e.target.value);
   };

   const handleSubmit = e => {
      e.preventDefault();
      api.auth.signup({ username, password }).then(response => {
         if (response.error) {
            console.log(response.error);
         } else {
            console.log(response);
            dispatch(signIn(response));
            props.history.push('/');
         }
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
            <input type="submit" />
         </form>
      </div>
   );
};

export default SignUp;
