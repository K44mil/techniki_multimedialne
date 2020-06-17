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
      return {
        ...state,
        loading: true
      };
    case CREATE_TEST_FAIL:
    case GET_TESTS_FAIL:
    case GET_FINISHED_TESTS_FAIL:
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
      return {
        ...state,
        loading: false,
        tests: payload
      };
    default:
      return state;
  }
}
