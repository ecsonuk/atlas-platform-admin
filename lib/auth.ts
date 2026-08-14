import Cookies from 'js-cookie';

export const auth = {
  setToken(token: string) {
    Cookies.set('access_token', token, {
      expires: 7,
      sameSite: 'lax',
    });
  },

  getToken() {
    return Cookies.get('access_token');
  },

  logout() {
    Cookies.remove('access_token');
  },

  isLoggedIn() {
    return !!Cookies.get('access_token');
  },
};
