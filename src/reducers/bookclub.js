export default (state = {}, action) => {
   switch (action.type) {
      case 'CURRENT_BOOKCLUB':
         return {
            bookclub: action.bookclub,
         };
      case 'UPDATE_USER':
         return {
            ...state,
            bookclub: {
               ...state.bookclub,
               users: action.users,
            },
         };
      default:
         return state;
   }
};
