import { combineReducers } from 'redux';
import { registerUserReducer, getUserReducer } from './user';
import { userLoginReducer } from './auth';

const rootReducer = combineReducers({
  registeredUser: registerUserReducer,
  currentUser: userLoginReducer,
  user: getUserReducer,
});

export default rootReducer;
