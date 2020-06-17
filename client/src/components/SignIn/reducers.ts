import { Token } from 'SignInModel';
import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { updateSignInAsync } from './actions';

export const isLoading = createReducer(false)
  .handleAction([updateSignInAsync.request], (state, action) => true)
  .handleAction([updateSignInAsync.success, updateSignInAsync.failure], (state, action) => false);

export const token = createReducer(null as Token)
  .handleAction(updateSignInAsync.success, (state, action) => action.payload.token);

const signInReducer = combineReducers({
  isLoading,
  token,
});

export default signInReducer;
export type SignInState = ReturnType<typeof signInReducer>;
