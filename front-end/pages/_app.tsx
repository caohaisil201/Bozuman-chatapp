import 'styles/index.scss';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  function checkAuth() {
    const isLogged = getCookie('logged');
    const publicPaths = [
      '/sign-in',
      '/sign-up',
      '/forgot-password',
      '/sign-up-success',
      '/reset-password',
      '/activate-account',
    ];
    if (isLogged) {
      const path = router.asPath.split('?')[0];
      if (publicPaths.includes(path)) {
        router.push({
          pathname: '/',
        });
      }
    } else {
      const path = router.asPath.split('?')[0];
      if (!publicPaths.includes(path)) {
        router.push({
          pathname: '/sign-in',
        });
      }
    }
  }
  useEffect(() => {
    checkAuth();
  });
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
