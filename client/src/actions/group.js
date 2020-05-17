import {
  ADD_GROUP_SUCCESS,
  ADD_GROUP_FAIL,
  GET_GROUPS_START,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAIL,
  GET_GROUP_BY_ID_START,
  GET_GROUP_BY_ID_SUCCESS,
  GET_GROUP_BY_ID_FAIL,
  DELETE_GROUP_START,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAIL,
  ADD_STUDENT_START,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAIL,
  DELETE_STUDENT_START,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAIL
} from './types';
import { client } from '../utils/setAuthToken';
import { setAlert } from './alert';

export const addGroup = ({ name, description }) => async dispatch => {
  const body = JSON.stringify({ name, description });

  try {
    const res = await client.post('/api/v1/groups', body);
    dispatch(getGroups());
    dispatch({
      type: ADD_GROUP_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Groupa została stworzona', 'success'));
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
  dispatch({
    type: GET_GROUPS_START
  });

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

export const getGroupById = id => async dispatch => {
  dispatch({
    type: GET_GROUP_BY_ID_START
  });
  try {
    const res = await client.get(`/api/v1/groups/${id}`);

    dispatch({
      type: GET_GROUP_BY_ID_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_GROUP_BY_ID_FAIL
    });
  }
};

export const deleteGroup = id => async dispatch => {
  dispatch({
    type: DELETE_GROUP_START
  });

  try {
    await client.delete(`/api/v1/groups/${id}`);
    dispatch(getGroups());
    dispatch(setAlert('Grupa została usunięta', 'success'));
    dispatch({
      type: DELETE_GROUP_SUCCESS,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: DELETE_GROUP_FAIL
    });
  }
};

export const addStudent = ({ id, email }) => async dispatch => {
  dispatch({
    type: ADD_STUDENT_START
  });

  try {
    const res = await client.put(`/api/v1/groups/${id}/addStudent/${email}`);
    dispatch({
      type: ADD_STUDENT_SUCCESS,
      payload: res.data
    });
    dispatch(getGroupById(id));
    dispatch(setAlert('Student was added', 'success'));
  } catch (err) {
    dispatch({
      type: ADD_STUDENT_FAIL
    });
  }
};

export const deleteStudent = (id, studentId) => async dispatch => {
  dispatch({
    type: DELETE_STUDENT_START
  });

  try {
    const res = await client.put(
      `/api/v1/groups/${id}/removeStudent/${studentId}`
    );

    dispatch({
      type: DELETE_STUDENT_SUCCESS,
      payload: res.data
    });
    dispatch(getGroupById(id));
    dispatch(setAlert('Student was deleted', 'success'));
  } catch (err) {
    dispatch({
      type: DELETE_STUDENT_FAIL
    });
  }
};
