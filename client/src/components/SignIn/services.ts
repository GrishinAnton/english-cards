import { LoginRequest, LoginResponse } from 'SignInModel';
import { fetchWrapper } from '../../utils';

export const update = (data: LoginRequest) => fetchWrapper<LoginResponse>('/login', 'POST', data);
