import 'styles/index.scss';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR  from 'swr'
import axiosClient from 'helper/axiosClient'

const checkToken = (response: any) => {
  if (response.data) {
    if (response.data.message === 'No token provided') {
      return false;
    }
    if (response.data.message === 'Refresh token expire') {
      return false;
    }
  }
  return true
}

function MyApp({ Component, pageProps }: AppProps) {
  const [authorized, setAuthorized] = useState(false);
  const response: any = useSWR(`${process.env.NEXT_PUBLIC_DOMAIN}/token`, async (apiURL: string) => await axiosClient.get(apiURL).then((res) => res.data));

  const router = useRouter();
  function authCheck(url: string) {
    const publicPaths = ['/sign-in', '/sign-up', '/forgot-password','/sign-up-success', '/reset-password', '/activate-account'];
    const path = url.split('?')[0];
    if (!checkToken(response) && !publicPaths.includes(path)) {
        setAuthorized(false);
        router.push({
            pathname: '/sign-in',
            query: { returnUrl: router.asPath }
        });
    } else if (checkToken(response) && publicPaths.includes(path)) {
      setAuthorized(true);
      router.push({
          pathname: '/',
          query: { returnUrl: router.asPath }
      });
  }  else {
        setAuthorized(true);
    }
}
  useEffect(() => {
    if (router.pathname === '/_error') {
      router.push('/');
    }
    authCheck(router.asPath);
    router.events.on('routeChangeComplete', authCheck)
    return () => {
      router.events.off('routeChangeComplete', authCheck);
  }
  }, []);
  return <>{authorized && <Component {...pageProps} />}</>;
}

export default MyApp;
