export default (state = {}, action) => {
   switch (action.type) {
      case 'CREATE_POLL':
         return {
            poll: action.poll,
         };
      case 'CREATE_OPTION':
         return {
            poll: {
               ...state.poll,
               option: [...state.poll.option, action.option],
            },
         };
      default:
         return state;
   }
};
