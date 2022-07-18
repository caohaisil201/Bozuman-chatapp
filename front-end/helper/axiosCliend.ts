import axios from "axios";
import _CONF from "config/config";
import { getCookie, setCookie } from "cookies-next";

const axiosClient = axios.create({
  baseURL: _CONF.DOMAIN,
  withCredentials: true,
});
// Đính kèm token cho mọi tương tác api (API chưa được gửi)
// interceptors.request: Xử lý request trước khi gửi lên server
axiosClient.interceptors.request.use(
  async (config: any) => {
    const token = getCookie("access_token");
    if (token) {
      config.headers = {
        "x-access-token": token,
      };
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
axiosClient.interceptors.response.use(
  (response) => response,
  async (error: any) => {
    const config = error?.config;
    if (error.response.status === 401 && !config?.sent) {
      config.sent = true;
      const res = await newToken()
      if (res?.data) {
        setCookie('access_token', res.data.accessToken)
        setCookie('refresh_token', res.data.accessToken)
        config.headers = {
          "x-access-token": res.data.accessToken,
        };
      }
      return config;
    }
    return Promise.reject(error);
  },
);
const newToken = async () => {
  const token = getCookie("refresh_token");
  if (token) {
    const res = axios.get(_CONF.DOMAIN + "api/token", {
      headers: {
        "x-refresh-token": token,
      },
    });
    return res;
  }
  // return res.status(401)
  // remove cookie -> log out
};
export default axiosClient;
