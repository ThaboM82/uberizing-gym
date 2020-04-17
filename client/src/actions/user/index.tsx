import axios from 'axios';
import { User } from '../../models/User';
import { Dispatch } from 'redux';

export enum RegisterUserActionTypes {
  REGISTER_USER_PENDING = 'REGISTER_USER_PENDING',
  REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
  REGISTER_USER_ERROR = 'REGISTER_USER_ERROR',
}

export const registerUser = (userPayload: User) => async (dispatch: Dispatch) => {
  dispatch({ type: RegisterUserActionTypes.REGISTER_USER_PENDING });
  try {
    const user = await axios.post(`http://localhost:3030/register-user`, userPayload);
    dispatch({
      type: RegisterUserActionTypes.REGISTER_USER_SUCCESS,
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
      type: RegisterUserActionTypes.REGISTER_USER_ERROR,
      error: error?.response?.data?.message || 'User Registration Failed',
    });
  }
};
