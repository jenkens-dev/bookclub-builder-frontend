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
         console.log(action);
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
