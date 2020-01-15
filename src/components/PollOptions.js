import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const PollOptions = () => {
   const poll = useSelector(state => state.poll.poll);
   const [select, setSelect] = useState('inauthor');
   const [search, setSearch] = useState('');

   const handleSubmit = event => {
      event.preventDefault();
      fetch(
         `https://www.googleapis.com/books/v1/volumes?q=${select}:${search}&maxResults=6&key=AIzaSyA39gVxErny8CXc27ySrZefMllAWF_det4`,
      )
         .then(response => response.json())
         .then(data => {
            console.log(data);
         });
   };

   const handleSearchChange = event => {
      setSearch(event.target.value);
   };

   const handleSelectChange = event => {
      setSelect(event.target.value);
   };

   return (
      <div>
         <h1>{poll.name}</h1>
         <form onSubmit={handleSubmit}>
            <label>
               Search
               <input
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
               />
               <select onChange={handleSelectChange}>
                  <option value="inauthor">Author</option>
                  <option value="intitle">Title</option>
               </select>
               <input type="submit" />
            </label>
         </form>
      </div>
   );
};

export default PollOptions;
