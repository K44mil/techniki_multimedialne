import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import group from './group';
import notification from './notification';
import task from './task';
import rate from './rate';

export default combineReducers({
  alert,
  auth,
  group,
  notification,
  task,
  rate
});
