import {
  CREATE_TASK_FAIL,
  CREATE_TASK_START,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_START,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
  GET_TASKS_START,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAIL,
  GET_TASK_BY_ID_START,
  GET_TASK_BY_ID_SUCCESS,
  GET_TASK_BY_ID_FAIL,
  DOWNLOAD_FILE_START,
  DOWNLOAD_FILE_SUCCESS,
  DOWNLOAD_FILE_FAIL,
  SEND_SOLUTION_START,
  SEND_SOLUTION_SUCCESS,
  SEND_SOLUTION_FAIL,
  GET_TASK_SOLUTION_BY_ID_START,
  GET_TASK_SOLUTION_BY_ID_SUCCESS,
  GET_TASK_SOLUTION_BY_ID_FAIL
} from './types';
import axios from 'axios';
import { client } from '../utils/setAuthToken';
import { setAlert } from './alert';
import { getGroupById } from './group';

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

  let formData = new FormData();
  formData.append('name', name);
  formData.append('description', description);
  formData.append('expireDate', expireDate);
  formData.append('groupId', groupId);
  for (let i = 0; i < files.length; i++) {
    formData.append(`files`, files[files.length - 1][i]);
  }

  try {
    const res = await axios.post(`/api/v1/tasks`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.token}`
      }
    });
    dispatch({
      type: CREATE_TASK_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Zadanie zostało stworzone', 'success'));
    dispatch(getGroupById(groupId));
  } catch (err) {
    dispatch({
      type: CREATE_TASK_FAIL
    });
  }
};

export const getTasks = () => async dispatch => {
  dispatch({
    type: GET_TASKS_START
  });

  try {
    const res = await client.get(`/api/v1/tasks`);

    dispatch({
      type: GET_TASKS_SUCCESS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: GET_TASKS_FAIL
    });
  }
};

export const deleteTask = id => async dispatch => {
  dispatch({
    type: DELETE_TASK_START
  });

  try {
    await client.delete(`/api/v1/tasks/${id}`);
    dispatch(getTasks());
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

export const getTaskById = id => async dispatch => {
  dispatch({
    type: GET_TASK_BY_ID_START
  });

  try {
    const res = await client.get(`/api/v1/tasks/${id}`);

    dispatch({
      type: GET_TASK_BY_ID_SUCCESS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: GET_TASK_BY_ID_FAIL
    });
  }
};

export const downloadFile = (id, fileName) => async dispatch => {
  dispatch({
    type: DOWNLOAD_FILE_START
  });

  try {
    const res = await client.get(`/api/v1/files/download/${id}`, {
      responseType: 'blob'
    });
    const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', fileName); //any other extension
    document.body.appendChild(link);
    link.click();
    link.remove();
    // console.log(res);
    dispatch({
      type: DOWNLOAD_FILE_SUCCESS
    });
  } catch (err) {
    dispatch({
      type: DOWNLOAD_FILE_FAIL
    });
  }
};

export const sendSolution = ({ id, text, files }) => async dispatch => {
  dispatch({
    type: SEND_SOLUTION_START
  });
  let formData = new FormData();
  formData.append('text', text);
  formData.append(`files`, files);

  try {
    const res = await axios.post(`/api/v1/tasks/${id}/addSolution`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.token}`
      }
    });
    dispatch({
      type: SEND_SOLUTION_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Rozwiązanie zostało wysłane', 'success'));
    // dispatch(getTaskById(id));
  } catch (err) {
    dispatch({
      type: SEND_SOLUTION_FAIL
    });
  }
};

export const getTaskSolutionById = id => async dispatch => {
  dispatch({
    type: GET_TASK_SOLUTION_BY_ID_START
  });

  try {
    const res = await client.get(`/api/v1/tasks/taskSolution/${id}`);

    dispatch({
      type: GET_TASK_SOLUTION_BY_ID_SUCCESS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: GET_TASK_SOLUTION_BY_ID_FAIL
    });
  }
};
