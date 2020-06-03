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
} from '../actions/types';

const initialState = {
  loading: true,
  task: null,
  tasks: [],
  solution: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_TASK_START:
    case GET_TASKS_START:
    case DELETE_TASK_START:
    case GET_TASK_BY_ID_START:
    case DOWNLOAD_FILE_START:
    case SEND_SOLUTION_START:
    case GET_TASK_SOLUTION_BY_ID_START:
      return {
        ...state,
        loading: true
      };
    case CREATE_TASK_FAIL:
    case GET_TASKS_FAIL:
    case DELETE_TASK_FAIL:
    case GET_TASK_BY_ID_FAIL:
    case DOWNLOAD_FILE_FAIL:
    case SEND_SOLUTION_FAIL:
    case GET_TASK_SOLUTION_BY_ID_FAIL:
      return {
        ...state,
        loading: false
      };
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        task: payload,
        loading: false
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: payload,
        loading: false
      };
    case DELETE_TASK_SUCCESS:
      return {
        tasks: state.tasks.filter(({ id }) => id !== payload),
        loading: false
      };
    case GET_TASK_BY_ID_SUCCESS:
    case GET_TASK_SOLUTION_BY_ID_SUCCESS:
      return {
        ...state,
        task: payload,
        loading: false
      };
    case DOWNLOAD_FILE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case SEND_SOLUTION_SUCCESS:
      return {
        ...state,
        solution: payload,
        loading: false
      };
    default:
      return state;
  }
}
