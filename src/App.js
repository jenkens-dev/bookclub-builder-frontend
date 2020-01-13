import React from 'react';
import MainContainer from './components/MainContainer';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
   return (
      <Router>
         <MainContainer />
      </Router>
   );
}

export default App;
