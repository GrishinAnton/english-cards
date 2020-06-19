import { ProfileData, ProfileResponse } from 'ProfileModel';
import { fetchWrapper } from '../../utils';

export const get = () => fetchWrapper<ProfileResponse>('/profile', 'GET');
export const update = (data: ProfileData) => fetchWrapper<ProfileResponse>('/profile', 'POST', data);
