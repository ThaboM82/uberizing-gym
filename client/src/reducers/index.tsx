import { combineReducers } from 'redux';
import { registerUserReducer, getUserReducer, getUserEventsReducer, updateUserReducer } from './user';
import { userLoginReducer, resetPasswordReducer } from './auth';
import { getAllGymsReducer, saveGymReducer, unsaveGymReducer, searchGymsReducer } from './gym';

const rootReducer = combineReducers({
  registeredUser: registerUserReducer,
  currentUser: userLoginReducer,
  user: getUserReducer,
  gyms: getAllGymsReducer || saveGymReducer || unsaveGymReducer || searchGymsReducer,
  userEvents: getUserEventsReducer,
  reset: resetPasswordReducer,
  updateUserState: updateUserReducer,
});

export default rootReducer;
