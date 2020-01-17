export default (state = { open: false }, action) => {
   switch (action.type) {
      case 'TOGGLE_MODAL_STATUS':
         return {
            open: action.open,
         };
      default:
         return state;
   }
};
