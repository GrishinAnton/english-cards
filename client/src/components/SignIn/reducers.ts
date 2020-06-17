import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { updateSignInAsync } from './actions';

export const isLoading = createReducer(false)
  .handleAction([updateSignInAsync.request], (state, action) => true)
  .handleAction([updateSignInAsync.success, updateSignInAsync.failure], (state, action) => false);

const signInReducer = combineReducers({
  isLoading,
});

export default signInReducer;
export type SignInState = ReturnType<typeof signInReducer>;
