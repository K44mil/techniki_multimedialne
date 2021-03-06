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
} from '../actions/types';

const initialState = {
  loading: false,
  group: null,
  groups: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_GROUP_BY_ID_START:
    case GET_GROUPS_START:
    case DELETE_GROUP_START:
    case ADD_STUDENT_START:
    case DELETE_STUDENT_START:
      return {
        ...state,
        loading: true
      };
    case ADD_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        group: payload
      };
    case ADD_GROUP_FAIL:
      return {
        ...state,
        loading: false
      };
    case GET_GROUPS_SUCCESS:
      return {
        ...state,
        loading: false,
        groups: payload
      };
    case GET_GROUPS_FAIL:
    case GET_GROUP_BY_ID_FAIL:
    case DELETE_GROUP_FAIL:
    case ADD_STUDENT_FAIL:
    case DELETE_STUDENT_FAIL:
      return {
        ...state,
        loading: false
      };
    case GET_GROUP_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        group: payload
      };
    case DELETE_GROUP_SUCCESS:
      return {
        groups: state.groups.filter(({ id }) => id !== payload),
        loading: false
      };
    case ADD_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        group: payload
      };
    case DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        group: payload
      };
    default:
      return state;
  }
}
