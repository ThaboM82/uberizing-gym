import { User } from '../../models/User';
import { ActionType } from '../../actions/user';
import { AnyAction } from 'redux';

export interface RegisterUserState {
  pending: boolean;
  registeredUser: User;
  error: string;
}

export interface UserState {
  pending: boolean;
  user: User;
  error: string;
}

export const registerUserReducer = (state: any = null, action: AnyAction) => {
  switch (action.type) {
    case ActionType.PENDING:
      return {
        ...state,
        pending: true,
      };
    case ActionType.SUCCESS:
      return {
        ...state,
        pending: false,
        registeredUser: action.payload,
        error: null,
      };
    case ActionType.ERROR:
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

export const getUserReducer = (state: any = null, action: AnyAction) => {
  switch (action.type) {
    case ActionType.PENDING:
      return {
        ...state,
        pending: true,
      };
    case ActionType.SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case ActionType.ERROR:
      return {
        ...state,
        user: null,
        error: action.error,
      };
    default:
      return state;
  }
};
