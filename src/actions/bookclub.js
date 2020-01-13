export const CURRENT_BOOKCLUB = bookclub => {
   return {
      type: 'CURRENT_BOOKCLUB',
      bookclub,
   };
};

export const ADD_USER = users => {
   return {
      type: 'ADD_USER',
      users,
   };
};
