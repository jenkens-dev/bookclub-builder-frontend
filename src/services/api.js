import { useState, useEffect } from 'react';

const API_ROOT = `https://bookclub-builder-server.herokuapp.com/api/v1`;
const token = localStorage.getItem('token');

const headers = {
   'Content-Type': 'application/json',
   Accepts: 'application/json',
   Authorization: token,
};

const useNetworkResource = url => {
   const [response, setResponse] = useState();
   const [fetched, setFetched] = useState(false);
   const [error, setError] = useState();
   const [retry, setRetry] = useState(false);

   useEffect(() => {
      const fetchFromServer = async () => {
         try {
            const response = await fetch(url);
            // show off our pretty loading experience because our backend is too blazing fast to need a loader
            // await new Promise(resolve => setTimeout(() => resolve(), 1000));

            if (response.status !== 200) {
               throw new Error('bad');
            }

            const responseData = await response.json();

            setResponse(responseData);
         } catch (error) {
            setError(error);
         } finally {
            setFetched(true);
         }
      };

      // useEffect cannot take an async function
      fetchFromServer();

      return () => {
         // called before next useEffect
         setFetched(false);
         setError();
      };
   }, [url, retry]);

   return [response, fetched, { error, forceRetry: () => setRetry(!retry) }];
};

const login = data => {
   return fetch(`${API_ROOT}/login`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
   }).then(res => res.json());
};

const signup = data => {
   return fetch(`${API_ROOT}/users`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
         username: data.username,
         password: data.password,
         profile_picture: data.picture,
      }),
   }).then(res => res.json());
};

const getCurrentUser = () => {
   return fetch(`${API_ROOT}/current_user`, {
      headers,
   }).then(res => {
      return res.json();
   });
};

export const api = {
   auth: {
      login,
      getCurrentUser,
      signup,
   },
   useNetworkResource,
};
