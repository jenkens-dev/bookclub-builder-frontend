import React, { useState } from 'react';
import { api } from '../services/api';

const Login = props => {
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
      api.auth.login({ username, password }).then(response => {
         response.error ? console.log(response.error) : props.history.push('/');
      });
   };

   return (
      <div>
         <h1>Login</h1>
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
            <a href="/signup">Sign Up</a>
         </form>
      </div>
   );
};

export default Login;
