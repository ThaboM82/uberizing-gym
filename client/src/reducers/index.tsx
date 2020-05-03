import { combineReducers } from 'redux';
import { registerUserReducer, getUserReducer, getUserEventsReducer, updateUserReducer } from './user';
import { userLoginReducer, resetPasswordReducer } from './auth';
import { getAllGymsReducer, saveGymReducer, unsaveGymReducer, getAllSavedGymsReducer } from './gym';
import { getAllUnsavedGyms } from '../actions';

const rootReducer = combineReducers({
  registeredUser: registerUserReducer,
  currentUser: userLoginReducer,
  user: getUserReducer,
  gyms: getAllGymsReducer || saveGymReducer || unsaveGymReducer || getAllSavedGymsReducer || getAllUnsavedGyms,
  userEvents: getUserEventsReducer,
  reset: resetPasswordReducer,
  updateUserState: updateUserReducer,
});

export default rootReducer;
