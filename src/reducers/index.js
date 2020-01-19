import { combineReducers } from 'redux';
import auth from './auth';
import bookclub from './bookclub';
import poll from './poll';
import book from './book';
import modal from './modal';

const rootReducer = combineReducers({
   auth,
   bookclub,
   poll,
   book,
   modal,
});

export default rootReducer;
