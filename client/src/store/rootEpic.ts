import { combineEpics } from 'redux-observable';

import signInEpics from '../components/SignIn/epics';
import profileEpics from '../components/Profile/epics';

const epics = combineEpics(
  ...signInEpics,
  ...profileEpics,
);

export default epics;
