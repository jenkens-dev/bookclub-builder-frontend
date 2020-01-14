export default (state = { user: {} }, action) => {
   switch (action.type) {
      case 'SIGN_IN':
         return {
            ...state,
            user: action.user,
         };
      case 'SIGN_OUT':
         return {
            ...state,
            user: {},
         };
      default:
         return state;
   }
};
