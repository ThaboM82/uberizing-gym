import { Dispatch } from "redux";
import Axios from "axios";
import { authUrl } from "../../utils/config";

export enum ActionType {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export const getAllGyms = (id?: number) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.PENDING });

  try {
    const gyms = await Axios.get(`http://${authUrl}:3030/all-gyms/${id}`);
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

export const saveGym = (gymId: number, userId: number) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.PENDING });

  try {
    const gyms = await Axios.post(`http://${authUrl}:3030/save-gym`, { gymId, userId });
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

export const unsaveGym = (gymId: number, userId: number) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.PENDING });

  try {
    const gyms = await Axios.post(`http://${authUrl}:3030/unsave-gym`, { gymId, userId });
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

export const getAllSavedGyms = (id?: number) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.PENDING });

  try {
    const gyms = await Axios.get(`http://${authUrl}:3030/saved-gyms/${id}`);
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

export const getAllUnsavedGyms = (id?: number) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.PENDING });

  try {
    const gyms = await Axios.get(`http://${authUrl}:3030/unsaved-gyms/${id}`);
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

export const searchGyms = (id?: number, payload?: { keyword?: string; location?: string }) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.PENDING });

  try {
    const gyms = await Axios.post(`http://${authUrl}:3030/search-gyms/${id}`, payload);
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
