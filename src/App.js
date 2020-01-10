import React from 'react';
import MainContainer from './components/MainContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
   return (
      <Router>
         <MainContainer />
      </Router>
   );
}

export default App;
