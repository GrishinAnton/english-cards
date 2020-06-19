import { ProfileData } from 'ProfileModel';
import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { getProfileAsync } from './actions';

type TProfileReducer = ProfileData | null;

export const isLoading = createReducer(false)
  .handleAction([getProfileAsync.request], (state, action) => true)
  .handleAction([getProfileAsync.success, getProfileAsync.failure], (state, action) => false);

export const profile = createReducer(null as TProfileReducer)
  .handleAction([getProfileAsync.success], (state, action) => { console.log(action); return action.payload.user });

const profileReducer = combineReducers({
  isLoading,
  profile,
});

export default profileReducer;
export type ProfileState = ReturnType<typeof profileReducer>;
