import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import group from './group';
import notification from './notification';
import task from './task';
import rate from './rate';
import message from './message';
import test from './test';
export default combineReducers({
  alert,
  auth,
  group,
  notification,
  task,
  rate,
  message,
  test
});
