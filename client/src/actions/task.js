import {
  CREATE_TASK_FAIL,
  CREATE_TASK_START,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_START,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL
} from './types';
import axios from 'axios';
import { client } from '../utils/setAuthToken';

export const createTask = ({
  name,
  description,
  expireDate,
  files,
  groupId
}) => async dispatch => {
  dispatch({
    type: CREATE_TASK_START
  });
  // console.log(files);

  let formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('expireDate', expireDate);
  formData.append('groupId', groupId);
  for (let i = 0; i < files.length; i++) {
    formData.append(`files[${i}]`, files[files.length - 1][i]);
  }

  try {
    const res = axios.post(`/api/v1/tasks`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.token}`
      }
    });
    dispatch({
      type: CREATE_TASK_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CREATE_TASK_FAIL
    });
  }
};

export const deleteTask = id => async dispatch => {
  dispatch({
    type: DELETE_TASK_START
  });

  try {
    await client.delete(`/api/v1/tasks/${id}`);
    dispatch({
      type: DELETE_TASK_SUCCESS,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: DELETE_TASK_FAIL
    });
  }
};
