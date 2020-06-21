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
  ACTIVATE_TEST_FAIL,
  GET_STUDENT_FINISHED_TEST_START,
  GET_STUDENT_FINISHED_TEST_SUCCESS,
  GET_STUDENT_FINISHED_TEST_FAIL,
  GET_PARTICIPANTS_DETAILS_START,
  GET_PARTICIPANTS_DETAILS_SUCCESS,
  GET_PARTICIPANTS_DETAILS_FAIL,
  GET_ALL_STUDENT_TESTS_START,
  GET_ALL_STUDENT_TESTS_SUCCESS,
  GET_ALL_STUDENT_TESTS_FAIL,
  GET_STUDENT_TEST_BY_ID_START,
  GET_STUDENT_TEST_BY_ID_SUCCESS,
  GET_STUDENT_TEST_BY_ID_FAIL,
  CHECK_TEST_RESULT_START,
  CHECK_TEST_RESULT_SUCCESS,
  CHECK_TEST_RESULT_FAIL
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
    dispatch(setAlert('Aktywowano test', 'success'));
  } catch (err) {
    dispatch({
      type: ACTIVATE_TEST_FAIL
    });
  }
};

export const getStudentFinishedTests = () => async dispatch => {
  dispatch({
    type: GET_STUDENT_FINISHED_TEST_START
  });

  try {
    const res = await client.get(`/api/v1/tests/myFinishedTests`);

    dispatch({
      type: GET_STUDENT_FINISHED_TEST_SUCCESS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: GET_STUDENT_FINISHED_TEST_FAIL
    });
  }
};

export const getParticipantsDetails = id => async dispatch => {
  dispatch({
    type: GET_PARTICIPANTS_DETAILS_START
  });
  try {
    const res = await client.get(`/api/v1/tests/${id}/details`);

    dispatch({
      type: GET_PARTICIPANTS_DETAILS_SUCCESS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: GET_PARTICIPANTS_DETAILS_FAIL
    });
  }
};

export const getAllStudentTests = () => async dispatch => {
  dispatch({
    type: GET_ALL_STUDENT_TESTS_START
  });

  try {
    const res = await client.get(`/api/v1/tests/myActiveTests`);

    dispatch({
      type: GET_ALL_STUDENT_TESTS_SUCCESS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_STUDENT_TESTS_FAIL
    });
  }
};

export const getStudentTestById = id => async dispatch => {
  dispatch({
    type: GET_STUDENT_TEST_BY_ID_START
  });

  try {
    const res = await client.get(`/api/v1/tests/startTest/${id}`);

    dispatch({
      type: GET_STUDENT_TEST_BY_ID_SUCCESS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: GET_STUDENT_TEST_BY_ID_FAIL
    });
  }
};

export const checkTestResult = (id, answers) => async dispatch => {
  dispatch({
    type: CHECK_TEST_RESULT_START
  });
  try {
    const body = { answers };

    const res = await client.post(`/api/v1/tests/checkTest/${id}`, body);

    dispatch({
      type: CHECK_TEST_RESULT_SUCCESS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: CHECK_TEST_RESULT_FAIL
    });
  }
};
