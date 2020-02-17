import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from 'utils/history';
import accounts from './accounts';
import userConfig from './userConfig';

export default combineReducers({
  accounts,
  userConfig,
  router: connectRouter(history)
});