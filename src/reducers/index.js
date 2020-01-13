import { combineReducers } from 'redux';
import auth from './auth';
import bookclub from './bookclub';

const rootReducer = combineReducers({
   auth,
   bookclub,
});

export default rootReducer;
