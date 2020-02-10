import React from 'react';
import MainContainer from './components/MainContainer';
import { HashRouter } from 'react-router-dom';
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
         <HashRouter basename="/">
            <MainContainer />
         </HashRouter>
      </ThemeProvider>
   );
}

export default App;
