import { combineReducers } from 'redux';
import auth from './auth';
import bookclub from './bookclub';
import poll from './poll';

const rootReducer = combineReducers({
   auth,
   bookclub,
   poll,
});

export default rootReducer;
