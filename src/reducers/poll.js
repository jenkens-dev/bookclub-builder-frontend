export default (state = {}, action) => {
   switch (action.type) {
      case 'CREATE_POLL':
         return {
            poll: action.poll,
         };
      default:
         return state;
   }
};
