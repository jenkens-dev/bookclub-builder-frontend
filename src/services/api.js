const API_ROOT = `http://localhost:3000/api/v1`;
const token = localStorage.getItem('token');

const headers = {
   'Content-Type': 'application/json',
   Accepts: 'application/json',
   Authorization: token,
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
        body: JSON.stringify(data),
     }).then(res => res.json());
}

const getCurrentUser = () => {
   console.log('getting current user', headers);
   return fetch(`${API_ROOT}/current_user`, {
      headers,
   }).then(res => {
      // console.log(res)
      return res.json();
   });
};

export const api = {
   auth: {
      login,
      getCurrentUser,
      signup
   },
};
