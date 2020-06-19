import { combineReducers } from 'redux';

import signInReducer from '../components/SignIn/reducers';
import profileReducer from '../components/Profile/reducers';

const reducers = combineReducers({
  signIn: signInReducer,
  profile: profileReducer,
});

export default reducers;
