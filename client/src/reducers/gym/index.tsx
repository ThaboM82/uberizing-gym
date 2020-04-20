import { AnyAction } from "redux";
import { Gym } from "../../models/Gym";

export interface GymsState {
  pending: boolean;
  gyms: Gym[];
  error: string;
}

export const getAllGymsReducer = (state: any = null, action: AnyAction) => {
  switch(action.type) {
    case 'PENDING':
      return {
        ...state,
        pending: true,
      };
    case 'SUCCESS':
      return {
        ...state,
        pending: false,
        gyms: action.payload,
        error: '',
      };
    case 'ERROR':
      return {
        ...state,
        pending: false,
        gyms: null,
        error: action.error
      };
    default:
      return state;
  }
}
