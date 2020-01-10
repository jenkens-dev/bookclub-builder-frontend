import { useEffect } from 'react';

function checkLogin() {
   useEffect(() => {
      const token = localStorage.getItem('token'); // Get the JWT token from local storage
      if (token) {
         // If a JWT token exists in local storage
         api.auth.getCurrentUser().then(user => {
            dispatch(signIn(user));
         });
      }
   }, []);
}

export default checkLogin;
