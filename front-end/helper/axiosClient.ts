import axios from 'axios';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { appRoutes } from 'constant/appRoutes';

const unProtectedRoutes = [
  appRoutes.SIGN_IN_PAGE,
  appRoutes.SIGN_UP_PAGE,
  appRoutes.FORGOT_PASSWORD_PAGE,
  appRoutes.RESET_PASSWORD_PAGE,
  appRoutes.SIGN_UP_SUCCESS_PAGE,
  appRoutes.ACTIVATE_ACCOUNT_PAGE,
]


const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DOMAIN,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  async (config: any) => {
    
    const token = getCookie('access_token');
    if (token) {
      config.headers = {
        'x-access-token': token,
      };
    }
    return config;
  },
  (error: any) => {
    return error;
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: any) => {
    const config = error?.config;
    try {
      if (
        error.response.status === 401 &&
        !config?.sent &&
        error.response.data.message === 'Unauthorized access'
      ) {
        config.sent = true;
        const res = await newToken();

        if (res?.data) {
          setCookie('access_token', res.data.accessToken);
          config.headers = {
            'x-access-token': res.data.accessToken,
          };
        }
        return config;
      }
    } catch (err) {
      deleteCookie('refresh_token');
      deleteCookie('access_token');
    }
    deleteCookie('refresh_token');
    deleteCookie('access_token');
    if (!unProtectedRoutes.includes(window.location.pathname)) {
      window.location.href = '/sign-in';
    }
    return error;
  }
);

const newToken = async () => {
  const token = getCookie('refresh_token');
  if (token) {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/token`,
        {
          headers: {
            'x-refresh-token': token,
          },
        }
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
};

export default axiosClient;
