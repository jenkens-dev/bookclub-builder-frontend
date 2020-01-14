export const CURRENT_BOOKCLUB = bookclub => {
   return {
      type: 'CURRENT_BOOKCLUB',
      bookclub,
   };
};

export const UPDATE_USER = users => {
   return {
      type: 'UPDATE_USER',
      users,
   };
};
