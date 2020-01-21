export default (state = { poll_options: [] }, action) => {
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
      case 'ARCHIVE_POLL':
         return {
            poll: { poll_options: [] },
         };
      default:
         return state;
   }
};
