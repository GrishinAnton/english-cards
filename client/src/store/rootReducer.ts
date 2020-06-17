import { combineReducers } from 'redux';

import signInReducer from '../components/SignIn/reducers';

const reducers = combineReducers({
  signIn: signInReducer,
});

export default reducers;
