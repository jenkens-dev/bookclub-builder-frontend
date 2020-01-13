export default (state = { bookclub: {} }, action) => {
   switch (action.type) {
      case 'CURRENT_BOOKCLUB':
         return {
            ...state,
            bookclub: action.bookclub,
         };
      default:
         return state;
   }
};
