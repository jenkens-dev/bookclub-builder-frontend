export default (state = {}, action) => {
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
