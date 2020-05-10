import { ADD_GROUP_SUCCESS, ADD_GROUP_FAIL } from '../actions/types';

const initialState = {
  loading: true,
  group: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
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
    default:
      return state;
  }
}