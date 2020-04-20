import { Dispatch } from "redux";
import Axios from "axios";
import { authUrl } from "../../utils/config";

export enum ActionType {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export const getAllGyms = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.PENDING });

  try {
    const gyms = await Axios.get(`http://${authUrl}:3030/all-gyms`);
    dispatch({
      type: ActionType.SUCCESS,
      payload: gyms?.data,
    });
  } catch (error) {
    dispatch({
      type: ActionType.ERROR,
      error: error?.response?.data?.message,
    });
  }
}
