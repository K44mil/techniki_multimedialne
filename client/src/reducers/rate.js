import {
  CREATE_RATE_START,
  CREATE_RATE_SUCCESS,
  CREATE_RATE_FAIL,
  GET_RATES_START,
  GET_RATES_SUCCESS,
  GET_RATES_FAIL
} from '../actions/types';

const initialState = {
  loading: true,
  rate: null,
  rates: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_RATE_START:
    case GET_RATES_START:
      return {
        ...state,
        loading: true
      };
    case CREATE_RATE_FAIL:
    case GET_RATES_FAIL:
      return {
        ...state,
        loading: false
      };
    case CREATE_RATE_SUCCESS:
      return {
        ...state,
        loading: false,
        rate: payload
      };
    case GET_RATES_SUCCESS:
      return {
        ...state,
        loading: false,
        rates: payload
      };
    default:
      return state;
  }
}
