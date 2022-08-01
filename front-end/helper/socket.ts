import { getCookie } from "cookies-next";
import io from "socket.io-client";

function getAccessToken () {
  const access_token = getCookie('access_token');
  return access_token;
}

export const socket = io(`${process.env.NEXT_PUBLIC_DOMAIN}`,{
  transportOptions: {
    polling: {
      extraHeaders: {
        'Authorization': `${getAccessToken()}`,
      },
    },
  },
}
);
