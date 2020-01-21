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

export const CURRENT_POLL = poll => {
   return {
      type: 'CURRENT_POLL',
      poll,
   };
};

export const ARCHIVE_POLL = () => {
   return {
      type: 'ARCHIVE_POLL',
   };
};
