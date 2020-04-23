import { combineReducers } from 'redux';
import { registerUserReducer, getUserReducer, getUserEventsReducer } from './user';
import { userLoginReducer, resetPasswordReducer } from './auth';
import { getAllGymsReducer } from './gym';

const rootReducer = combineReducers({
  registeredUser: registerUserReducer,
  currentUser: userLoginReducer,
  user: getUserReducer,
  gyms: getAllGymsReducer,
  userEvents: getUserEventsReducer,
  resetPassword: resetPasswordReducer,
});

export default rootReducer;
