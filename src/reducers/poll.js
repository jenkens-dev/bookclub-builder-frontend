export default (state = { option: [] }, action) => {
   switch (action.type) {
      case 'CREATE_POLL':
         return {
            poll: {
               ...action.poll,
               option: [],
            },
         };
      case 'CREATE_OPTION':
         return {
            poll: {
               ...state.poll,
               option: [...state.poll.option, action.option],
            },
         };
      case 'CURRENT_POLL':
         return {
            poll: action.poll,
         };
      default:
         return state;
   }
};
