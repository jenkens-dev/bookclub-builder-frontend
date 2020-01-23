import React from 'react';
import MainContainer from './components/MainContainer';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './index.css';

const theme = createMuiTheme({
   typography: {
      fontFamily: [
         'Playfair Display',
         'Roboto',
         '"Helvetica Neue"',
         'Arial',
         'sans-serif',
      ].join(','),
   },
});

function App() {
   return (
      <ThemeProvider theme={theme}>
         <Router>
            <MainContainer />
         </Router>
      </ThemeProvider>
   );
}

export default App;
