export default (state = { user: {} }, action) => {
   switch (action.type) {
      case 'SIGN_IN':
         return {
            ...state,
            user: action.user,
         };
      default:
         return state;
   }
};
