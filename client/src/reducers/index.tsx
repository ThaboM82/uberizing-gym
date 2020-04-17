import { combineReducers } from 'redux';
import { registerUserReducer } from './user';
import { userLoginReducer } from './auth';

const rootReducer = combineReducers({
    registeredUser: registerUserReducer,
    currentUser: userLoginReducer,
});

export default rootReducer;
