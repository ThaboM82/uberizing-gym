import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { Dispatch } from 'redux';
import { CurrentUser } from '../../models/CurrentUser';
import { authUrl } from '../../utils/config';

export enum Action {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCEES',
  ERROR = 'ERROR',
}

export const login = (username: string, password: string) => async (dispatch: Dispatch) => {
  dispatch({ type: Action.PENDING });

  try {
    const url = 'http://' + authUrl + ':3030/login';
    const token = await axios.post(url, { username, password });
    const decodedToken: any = jwt.decode(token?.data);
    const currentUser: CurrentUser = {
      token: token.data,
      isLoggedIn: token && token.data ? true : false,
      ...decodedToken,
    };
    dispatch({
      type: Action.SUCCESS,
      payload: currentUser,
    });
  } catch (error) {
    dispatch({
      type: Action.ERROR,
      error: error?.response?.data?.message ?? 'Authentication Denied',
    });
  }
};

export const resetPassword = (username: string, password: string) => async (dispatch: Dispatch) => {
  dispatch({ type: Action.PENDING });

  try {
    const url = 'http://' + authUrl + ':3030/reset-password';
    const result = await axios.post(url, { username, password });
    dispatch({
      type: Action.SUCCESS,
      payload: result?.data,
    });
  } catch (error) {
    dispatch({
      type: Action.ERROR,
      error: error?.response?.data?.message ?? 'Password Reset Failed',
    });
  }
};
