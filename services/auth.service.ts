import api from '@/lib/api';

export interface LoginDto {
  email: string;
  password: string;
}

export const AuthService = {
  login(data: LoginDto) {
    return api.post('/auth/login', data);
  },

  profile() {
    return api.get('/auth/profile');
  },
};
