import { RootState } from '../types';

export const getUser = (state: RootState) => state.auth.user
export const getUserAuth = (state: RootState) => state.auth.isAuthorized
