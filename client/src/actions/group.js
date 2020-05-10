import {
  ADD_GROUP_SUCCESS,
  ADD_GROUP_FAIL,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAIL
} from './types';
import { client } from '../utils/setAuthToken';
import { setAlert } from './alert';

export const addGroup = ({ name, description }) => async dispatch => {
  const body = JSON.stringify({ name, description });

  try {
    const res = await client.post('/api/v1/groups', body);
    dispatch(setAlert('Group added successfully', 'success'));
    dispatch({
      type: ADD_GROUP_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const error = err.response.data.error;

    if (error) {
      dispatch(setAlert(error, 'danger'));
    }
    dispatch({
      type: ADD_GROUP_FAIL
    });
  }
};

export const getGroups = () => async dispatch => {
  try {
    const res = await client.get(`/api/v1/groups/myGroups`);

    dispatch({
      type: GET_GROUPS_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_GROUPS_FAIL
    });
  }
};
