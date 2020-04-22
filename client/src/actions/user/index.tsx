import axios from 'axios';
import { User } from '../../models/User';
import { Dispatch } from 'redux';
import { authUrl } from '../../utils/config';

export enum ActionType {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export const registerUser = (userPayload: User) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.PENDING });
  try {
    const url = 'http://' + authUrl + ':3030/login';
    const user = await axios.post(url, userPayload);
    dispatch({
      type: ActionType.SUCCESS,
      payload: user?.data,
    });
  } catch (error) {
    // let errorMessage = '';
    // console.log(error?.response);
    // const err = error?.response?.data?.errors;
    // if (err) {
    //   err.forEach((e: any) => errorMessage += `<p>${Object.values(e.constraints)[0]}</p>`);
    // }
    dispatch({
      type: ActionType.ERROR,
      error: error?.response?.data?.message || 'User Registration Failed',
    });
  }
};

export const getUser = (id: number) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.PENDING });
  try {
    const url = `http://` + authUrl + `:3030/user/${id}`;
    const user = await axios.get(url);
    dispatch({
      type: ActionType.SUCCESS,
      payload: user?.data,
    });
  } catch (error) {
    dispatch({
      type: ActionType.ERROR,
      error: error?.response?.data?.message || 'Cannot Get User Profile',
    });
  }
};

export const updateUser = (id: number, userPayload: User) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.PENDING });
  try {
    const url = `http://` + authUrl + `:3030/user/${id}`;
    const user = await axios.post(url, userPayload);
    dispatch({
      type: ActionType.SUCCESS,
      payload: user?.data,
    });
  } catch (error) {
    dispatch({
      type: ActionType.ERROR,
      error: error?.response?.data?.message || 'Cannot Update User Profile',
    });
  }
};

export const getUserEvents = (id: number) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.PENDING });
  try {
    const url = `http://` + authUrl + `:3030/user/${id}/events`;
    const events = await axios.get(url);
    dispatch({
      type: ActionType.SUCCESS,
      payload: events?.data,
    });
  } catch (error) {
    dispatch({
      type: ActionType.ERROR,
      error: error?.response?.data?.message || 'Cannot Get User Profile',
    });
  }
};
