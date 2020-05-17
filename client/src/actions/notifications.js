import {
  GET_NOTIFICATIONS_FAIL,
  GET_NOTIFICATIONS_START,
  GET_NOTIFICATIONS_SUCCESS,
  DELETE_NOTIFICATIONS_FAIL,
  DELETE_NOTIFICATIONS_START,
  DELETE_NOTIFICATIONS_SUCCESS
} from '../actions/types';
import { client } from '../utils/setAuthToken';
import { setAlert } from './alert';

export const getNotifications = () => async dispatch => {
  dispatch({
    type: GET_NOTIFICATIONS_START
  });

  try {
    const res = await client.get(`/api/v1/notifications/myNotifications`);
    dispatch({
      type: GET_NOTIFICATIONS_SUCCESS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: GET_NOTIFICATIONS_FAIL
    });
  }
};

export const deleteNotification = id => async dispatch => {
  dispatch({
    type: DELETE_NOTIFICATIONS_START
  });

  try {
    await client.delete(`/api/v1/notifications/${id}`);
    dispatch(getNotifications());
    dispatch(setAlert('Powiadomienie zostało usunięte', 'success'));
    dispatch({
      type: DELETE_NOTIFICATIONS_SUCCESS,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: DELETE_NOTIFICATIONS_FAIL
    });
  }
};
