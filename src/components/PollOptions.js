import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PollOptionShow from './PollOptionShow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { ToastContainer, toast, Slide } from 'react-toastify';
// import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.minimal.css';
import '../toast.css';

const PollOptions = () => {
   const poll = useSelector(state => state.poll.poll);
   const [options, setOptions] = useState([]);
   const [select, setSelect] = useState('inauthor');
   const [search, setSearch] = useState('');

   const useStyles = makeStyles({
      root: {
         display: 'flex',
         flexWrap: 'wrap',
         justifyContent: 'center',
         alignContent: 'center',
         height: '100%',
      },
      card: {
         minWidth: '30%',
         maxWidth: '30%',
         margin: 10,
      },
      media: {
         height: 345,
         width: '100%',
         objectFit: 'cover',
      },
   });

   const classes = useStyles();

   const handleSubmit = event => {
      console.log('submitting');
      event.preventDefault();
      fetch(
         `https://www.googleapis.com/books/v1/volumes?q=${select}:${search}&maxResults=6&key=AIzaSyA39gVxErny8CXc27ySrZefMllAWF_det4`,
      )
         .then(response => response.json())
         .then(data => {
            setOptions(data.items);
            console.log(data.items);
         });
   };

   const handleSearchChange = event => {
      setSearch(event.target.value);
   };

   const handleSelectChange = event => {
      setSelect(event.target.value);
   };

   const notify = bookTitle => {
      toast.success(`Added ${bookTitle} to poll options`);
   };

   return (
      <div>
         <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
         >
            <h1>{poll.name}</h1>
            <form onSubmit={handleSubmit}>
               <Box>
                  <TextField
                     autoComplete="off"
                     id="search"
                     label="Search"
                     value={search}
                     onChange={handleSearchChange}
                     InputProps={{
                        startAdornment: (
                           <InputAdornment position="start">
                              <SearchIcon />
                           </InputAdornment>
                        ),
                     }}
                  />
               </Box>
               <Box>
                  <FormControl variant="filled" style={{ width: '100%' }}>
                     <Select
                        labelId="Search"
                        id="search"
                        onChange={handleSelectChange}
                        autoWidth={true}
                     >
                        <MenuItem value="">
                           <em>None</em>
                        </MenuItem>
                        <MenuItem value="inauthor">Author</MenuItem>
                        <MenuItem value="intitle">Title</MenuItem>
                     </Select>
                  </FormControl>
               </Box>
               <Box>
                  <Button
                     type="submit"
                     variant="contained"
                     color="primary"
                     style={{ marginTop: '5px' }}
                  >
                     Submit
                  </Button>
               </Box>
            </form>
         </Box>
         <ToastContainer autoClose={8000} transition={Slide} />
         <div className={classes.root}>
            {options.map(option => (
               <PollOptionShow
                  key={option.id}
                  option={option}
                  searchId={option.id}
                  notify={notify}
               />
            ))}
         </div>
      </div>
   );
};

export default PollOptions;
