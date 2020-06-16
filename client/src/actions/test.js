import {
  CREATE_TEST_START,
  CREATE_TEST_SUCCESS,
  CREATE_TEST_FAIL,
  GET_TESTS_START,
  GET_TESTS_SUCCESS,
  GET_TESTS_FAIL
} from './types';
import { client } from '../utils/setAuthToken';
import { setAlert } from './alert';

export const createTest = test => async dispatch => {
  const body = JSON.stringify(test);
  dispatch({
    type: CREATE_TEST_START
  });

  try {
    const res = await client.post(`/api/v1/tests`, body);
    dispatch({
      type: CREATE_TEST_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert('Stworzono test', 'success'));
  } catch (err) {
    dispatch({
      type: CREATE_TEST_FAIL
    });
  }
};

//   export const getRates = () => async dispatch => {
//     dispatch({
//       type: GET_RATES_START
//     });

//     try {
//       const res = await client.get(`/api/v1/rates/myRates`);

//       dispatch({
//         type: GET_RATES_SUCCESS,
//         payload: res.data.data
//       });
//     } catch (err) {
//       dispatch({
//         type: GET_RATES_FAIL
//       });
//     }
//   };
