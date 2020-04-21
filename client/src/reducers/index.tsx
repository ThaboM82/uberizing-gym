import { combineReducers } from 'redux';
import { registerUserReducer, getUserReducer, getUserEventsReducer } from './user';
import { userLoginReducer } from './auth';
import { getAllGymsReducer } from './gym';

const rootReducer = combineReducers({
  registeredUser: registerUserReducer,
  currentUser: userLoginReducer,
  user: getUserReducer,
  gyms: getAllGymsReducer,
  events: getUserEventsReducer
});

export default rootReducer;
