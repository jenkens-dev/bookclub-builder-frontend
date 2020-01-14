export const SIGN_IN = user => {
   return {
      type: 'SIGN_IN',
      user,
   };
};

export const SIGN_OUT = () => {
   return {
      type: 'SIGN_OUT',
   };
};
