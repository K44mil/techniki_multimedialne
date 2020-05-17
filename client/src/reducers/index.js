import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import group from './group';
import notification from './notification';

export default combineReducers({
  alert,
  auth,
  group,
  notification
});
