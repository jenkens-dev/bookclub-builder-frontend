import React, { useState } from 'react';
import { api } from '../services/api';

const SignUp = props => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const handleUsernameChange = e => {
      setUsername(e.target.value);
   };

   const handlePasswordChange = e => {
      setPassword(e.target.value);
   };

   const handleSubmit = e => {
      e.preventDefault();
      api.auth.signup({ username, password }).then(response => {
         response.error ? console.log(response.error) : props.history.push('/');
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
