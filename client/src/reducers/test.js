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
} from '../actions/types';

const initialState = {
  loading: true,
  test: null,
  tests: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_TEST_START:
    case GET_TESTS_START:
    case GET_FINISHED_TESTS_START:
    case GET_ACTIVE_TESTS_START:
    case GET_TEST_BY_ID_START:
    case ACTIVATE_TEST_START:
      return {
        ...state,
        loading: true
      };
    case CREATE_TEST_FAIL:
    case GET_TESTS_FAIL:
    case GET_FINISHED_TESTS_FAIL:
    case GET_ACTIVE_TESTS_FAIL:
    case GET_TEST_BY_ID_FAIL:
    case ACTIVATE_TEST_FAIL:
    case ACTIVATE_TEST_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case CREATE_TEST_SUCCESS:
      return {
        ...state,
        loading: false,
        test: payload
      };
    case GET_TESTS_SUCCESS:
    case GET_FINISHED_TESTS_SUCCESS:
    case GET_ACTIVE_TESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        tests: payload
      };
    case GET_TEST_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        test: payload
      };
    default:
      return state;
  }
}
