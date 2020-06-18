import { combineEpics } from 'redux-observable';

import signInEpics from '../components/SignIn/epics';

const epics = combineEpics(
  ...signInEpics,
);

export default epics;
