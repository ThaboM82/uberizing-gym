import { CurrentUser } from '../../models/CurrentUser';
import { Action } from '../../actions/auth';
import { AnyAction } from 'redux';

export interface CurrentUserState {
  pending: boolean;
  currentUser: CurrentUser;
  error: string;
}

export interface ResetPasswordState {
  pending: boolean;
  reset: string;
  error: string;
}

export const userLoginReducer = (state: any = null, action: AnyAction) => {
  switch (action.type) {
    case Action.PENDING:
      return {
        ...state,
        pending: true,
      };
    case Action.SUCCESS:
      return {
        ...state,
        pending: false,
        currentUser: action.payload,
        error: null,
      };
    case Action.ERROR:
      return {
        ...state,
        pending: true,
        currentUser: null,
        error: action.error,
      };
    default:
      return state;
  }
};

export const resetPasswordReducer = (state: any = null, action: AnyAction) => {
  switch (action.type) {
    case Action.PENDING:
      return {
        ...state,
        pending: true,
      };
    case Action.SUCCESS:
      return {
        ...state,
        pending: false,
        reset: action.payload,
        error: null,
      };
    case Action.ERROR:
      return {
        ...state,
        pending: true,
        reset: null,
        error: action.error,
      };
    default:
      return state;
  }
};
