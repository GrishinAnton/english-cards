import { LoginRequest, LoginResponse } from 'SignInModel';
import { createAsyncAction } from 'typesafe-actions';

export const updateSignInAsync = createAsyncAction(
  'UPDATE_SIGN_IN_REQUEST',
  'UPDATE_SIGN_IN_SUCCESS',
  'UPDATE_SIGN_IN_FAILURE',
)<LoginRequest, LoginResponse, Error>();
