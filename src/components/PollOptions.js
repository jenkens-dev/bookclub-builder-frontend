import React from 'react';
import { useSelector } from 'react-redux';

const PollOptions = () => {
   const poll = useSelector(state => state.poll.poll);
   return <div>Hi</div>;
};

export default PollOptions;
