import React from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
   return (
      <Router>
         <Route exact path="/" render={() => <div>Home</div>} />
         <Route
            exact
            path="/login"
            render={routerProps => <Login {...routerProps} />}
         />
         <Route
            exact
            path="/signup"
            render={routerProps => <SignUp {...routerProps} />}
         />
      </Router>
   );
}

export default App;
