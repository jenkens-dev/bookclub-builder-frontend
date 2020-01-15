export const CREATE_POLL = poll => {
   return {
      type: 'CREATE_POLL',
      poll,
   };
};

export const CREATE_OPTION = option => {
   return {
      type: 'CREATE_OPTION',
      option,
   };
};
