import { User } from '../../models/User';
import { RegisterUserActionTypes } from '../../actions/user';
import { AnyAction } from 'redux';

export interface RegisterUserState {
  pending: boolean;
  registeredUser: User;
  error: string;
}

export const registerUserReducer = (state: any = null, action: AnyAction) => {
  switch (action.type) {
    case RegisterUserActionTypes.REGISTER_USER_PENDING:
      return {
        ...state,
        pending: true,
      };
    case RegisterUserActionTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        registeredUser: action.payload,
        error: null,
      };
    case RegisterUserActionTypes.REGISTER_USER_ERROR:
      return {
        ...state,
        pending: false,
        registeredUser: null,
        error: action.error,
      };
    default:
      return state;
  }
};
