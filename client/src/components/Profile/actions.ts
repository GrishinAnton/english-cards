import { ProfileResponse } from 'ProfileModel';
import { createAsyncAction } from 'typesafe-actions';

export const getProfileAsync = createAsyncAction(
  'GET_PROFILE_REQUEST',
  'GET_PROFILE_SUCCESS',
  'GET_PROFILE_FAILURE',
)<undefined, ProfileResponse, Error>();
