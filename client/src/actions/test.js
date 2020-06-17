import {
  CREATE_TEST_START,
  CREATE_TEST_SUCCESS,
  CREATE_TEST_FAIL,
  GET_TESTS_START,
  GET_TESTS_SUCCESS,
  GET_TESTS_FAIL,
  GET_FINISHED_TESTS_START,
  GET_FINISHED_TESTS_SUCCESS,
  GET_FINISHED_TESTS_FAIL,
  GET_ACTIVE_TESTS_START,
  GET_ACTIVE_TESTS_SUCCESS,
  GET_ACTIVE_TESTS_FAIL,
  GET_TEST_BY_ID_START,
  GET_TEST_BY_ID_SUCCESS,
  GET_TEST_BY_ID_FAIL,
  ACTIVATE_TEST_START,
  ACTIVATE_TEST_SUCCESS,
  ACTIVATE_TEST_FAIL
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

export const getActiveTests = () => async dispatch => {
  dispatch({
    type: GET_ACTIVE_TESTS_START
  });

  try {
    const res = await client.get(`/api/v1/tests/activeTests`);

    dispatch({
      type: GET_ACTIVE_TESTS_SUCCESS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: GET_ACTIVE_TESTS_FAIL
    });
  }
};

export const getTestById = id => async dispatch => {
  dispatch({
    type: GET_TEST_BY_ID_START
  });
  try {
    const res = await client.get(`/api/v1/tests/${id}`);

    dispatch({
      type: GET_TEST_BY_ID_SUCCESS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: GET_TEST_BY_ID_FAIL
    });
  }
};

export const activateTest = ({
  availableAt,
  availableUntil,
  groupId,
  testId
}) => async dispatch => {
  dispatch({
    type: ACTIVATE_TEST_START
  });
  try {
    const body = { availableAt, availableUntil };
    const res = await client.post(
      `/api/v1/tests/${testId}/group/${groupId}`,
      body
    );
    dispatch({
      type: ACTIVATE_TEST_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ACTIVATE_TEST_FAIL
    });
  }
};
