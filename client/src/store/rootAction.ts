// import { routerActions } from 'connected-react-router';
import { createAction } from 'typesafe-actions';

import * as SignInActions from '../components/SignIn/actions';
import * as ProfileActions from '../components/Profile/actions';

const actions = {
  // router: routerActions,
  signIn: SignInActions,
  profile: ProfileActions,
}

export default actions;
