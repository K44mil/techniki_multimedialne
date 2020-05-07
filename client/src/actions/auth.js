import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';
import setAuthToken, { client } from '../utils/setAuthToken';
import { setAlert } from './alert';

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await client.get(`/api/v1/auth/me`);

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//Register User
export const register = ({
  email,
  role,
  password,
  firstName,
  lastName
}) => async dispatch => {
  const body = JSON.stringify({ email, role, password, firstName, lastName });

  try {
    const res = await client.post(`/api/v1/auth/register`, body);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data.error;

    if (error) {
      dispatch(setAlert(error, 'danger'));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

//Login User
export const login = ({ email, password }) => async dispatch => {
  const body = JSON.stringify({ email, password });

  try {
    const res = await client.post(`/api/v1/auth/login`, body);
    setAuthToken(res.data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const error = err.response.data.error;

    if (error) {
      dispatch(setAlert(error, 'danger'));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
