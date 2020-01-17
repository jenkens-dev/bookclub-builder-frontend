export default (state = {}, action) => {
   switch (action.type) {
      case 'CURRENT_BOOK':
         return {
            book: action.book,
         };
      default:
         return state;
   }
};
