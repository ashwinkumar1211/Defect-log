import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../constants/signOnConstants';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    if (email == 'test' && password == 'test') {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: 'Login success',
      });
    } else dispatch({ type: USER_LOGIN_FAIL, payload: 'User not allowed' });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: 'User not allowed',
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('defectItems');
  dispatch({ type: USER_LOGOUT });
};
