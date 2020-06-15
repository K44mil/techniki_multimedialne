import {
  GET_MESSAGES_START,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL
} from './types';
import { client } from '../utils/setAuthToken';
import { setAlert } from './alert';

export const getMessages = id => async dispatch => {
  dispatch({
    type: GET_MESSAGES_START
  });
  try {
    const res = await client.get(`/api/v1/messages/group/${id}`);
    dispatch({
      type: GET_MESSAGES_SUCCESS,
      payload: res.data.data
    });
  } catch (error) {
    dispatch({
      type: GET_MESSAGES_FAIL
    });
  }
};
