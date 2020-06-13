import {
  CREATE_RATE_START,
  CREATE_RATE_SUCCESS,
  CREATE_RATE_FAIL,
  GET_RATES_START,
  GET_RATES_SUCCESS,
  GET_RATES_FAIL
} from './types';
import { client } from '../utils/setAuthToken';
import { setAlert } from './alert';

export const createRate = ({ id, value, comment }) => async dispatch => {
  const body = JSON.stringify({ value, comment });
  dispatch({
    type: CREATE_RATE_START
  });

  try {
    const res = await client.post(`/api/v1/rates/solution/${id}`, body);
    dispatch({
      type: CREATE_RATE_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: CREATE_RATE_FAIL
    });
  }
};

export const getRates = () => async dispatch => {
  dispatch({
    type: GET_RATES_START
  });

  try {
    const res = await client.get(`/api/v1/rates/myRates`);

    dispatch({
      type: GET_RATES_SUCCESS,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: GET_RATES_FAIL
    });
  }
};
