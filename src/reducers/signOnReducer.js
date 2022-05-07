import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_LOGIN_SUCCESS,
} from '../constants/signOnConstants';

export const signOnReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, success: action.payload, auth: true };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload, auth: false };
    case USER_LOGOUT:
      return { auth: false };
    default:
      return state;
  }
};
