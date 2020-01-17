import React from 'react';
import { useSelector } from 'react-redux';

const PollShow = () => {
   const poll = useSelector(state => state.poll.poll);
   console.log(poll);
   return <div>Hi</div>;
};

export default PollShow;
 

