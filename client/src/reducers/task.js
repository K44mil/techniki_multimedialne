import {
  CREATE_TASK_FAIL,
  CREATE_TASK_START,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_START,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL
} from '../actions/types';

const initialState = {
  loading: true,
  task: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_TASK_START:
    case DELETE_TASK_START:
      return {
        ...state,
        loading: true
      };
    case CREATE_TASK_FAIL:
    case DELETE_TASK_FAIL:
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
    case DELETE_TASK_SUCCESS:
      return {
        task: state.task.filter(({ id }) => id !== payload),
        loading: false
      };
    default:
      return state;
  }
}
