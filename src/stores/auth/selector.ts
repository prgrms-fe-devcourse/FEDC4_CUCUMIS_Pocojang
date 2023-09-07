import { RootState } from '@/stores';
import { AuthState } from '@/stores/auth/slice';

export const authSelector = (state: RootState): AuthState => state.auth;
