import { combineReducers } from 'redux';
import { registerUserReducer, getUserReducer } from './user';
import { userLoginReducer } from './auth';
import { getAllGymsReducer } from './gym';

const rootReducer = combineReducers({
  registeredUser: registerUserReducer,
  currentUser: userLoginReducer,
  user: getUserReducer,
  gyms: getAllGymsReducer,
});

export default rootReducer;
