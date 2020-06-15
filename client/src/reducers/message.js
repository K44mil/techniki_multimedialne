import {
  GET_MESSAGES_START,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL
} from '../actions/types';

const initialState = {
  loading: true,
  messages: [],
  room: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MESSAGES_START:
      return {
        ...state,
        loading: true
      };
    case GET_MESSAGES_FAIL:
      return {
        ...state,
        loading: false
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: payload
      };
    default:
      return state;
  }
}
