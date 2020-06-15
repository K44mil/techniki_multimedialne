import {
  GET_NOTIFICATIONS_FAIL,
  GET_NOTIFICATIONS_START,
  GET_NOTIFICATIONS_SUCCESS,
  DELETE_NOTIFICATIONS_FAIL,
  DELETE_NOTIFICATIONS_START,
  DELETE_NOTIFICATIONS_SUCCESS
} from '../actions/types';

const initialState = {
  loading: true,
  notifications: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_NOTIFICATIONS_START:
    case DELETE_NOTIFICATIONS_START:
      return {
        ...state,
        loading: true
      };
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: payload,
        loading: false
      };
    case GET_NOTIFICATIONS_FAIL:
    case DELETE_NOTIFICATIONS_FAIL:
      return {
        ...state,
        loading: false
      };
    case DELETE_NOTIFICATIONS_SUCCESS:
      return {
        notifications: state.notifications.filter(({ id }) => id !== payload),
        loading: false
      };
    default:
      return state;
  }
}
