import {
  CREATE_TEST_START,
  CREATE_TEST_SUCCESS,
  CREATE_TEST_FAIL,
  GET_TESTS_START,
  GET_TESTS_SUCCESS,
  GET_TESTS_FAIL,
  GET_FINISHED_TESTS_START,
  GET_FINISHED_TESTS_SUCCESS,
  GET_FINISHED_TESTS_FAIL
} from './types';
import { client } from '../utils/setAuthToken';
import { setAlert } from './alert';

export const createTest = test => async dispatch => {
  //   const body = JSON.stringify(test);
  dispatch({
    type: CREATE_TEST_START
  });

  try {
    const res = await client.post(`/api/v1/tests/`, test);
    dispatch({
      type: CREATE_TEST_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Stworzono test', 'success'));
  } catch (err) {
    dispatch({
      type: CREATE_TEST_FAIL
    });
  }
};

export const getTests = () => async dispatch => {
  dispatch({
    type: GET_TESTS_START
  });

  try {
    const res = await client.get(`/api/v1/tests/`);

    dispatch({
      type: GET_TESTS_SUCCESS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: GET_TESTS_FAIL
    });
  }
};

export const getFinishedTests = () => async dispatch => {
  dispatch({
    type: GET_FINISHED_TESTS_START
  });

  try {
    const res = await client.get(`/api/v1/tests/finishedTests`);

    dispatch({
      type: GET_FINISHED_TESTS_SUCCESS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: GET_FINISHED_TESTS_FAIL
    });
  }
};
