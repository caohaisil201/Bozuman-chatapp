import 'styles/index.scss';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';
import axiosClient from 'helper/axiosClient';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  async function checkLogin() {
    const res = await axiosClient.get(`${process.env.NEXT_PUBLIC_DOMAIN}/`).then(res => res);
    return res;
  }
  
  async function checkAuth() {
    const publicPaths = [
      '/sign-in',
      '/sign-up',
      '/forgot-password',
      '/sign-up-success',
      '/reset-password',
      '/activate-account',
    ];

    const path = router.asPath.split('?')[0];
    const checkIsLogin : any = await checkLogin();
    let isLogin : boolean = true;

    if (checkIsLogin.response) {
      isLogin = false;
    }

    if(!publicPaths.includes(path)) {
      if(!isLogin){
        router.push({
          pathname: '/sign-in',
        })
      }
    }else{
      if(isLogin){
        router.push({
          pathname: '/',
        })
      }
    }
  }

  useEffect(() => {
    checkAuth();
  });

  return (
    <>
      <SWRConfig
        value={{
          refreshInterval: 10000,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}

export default MyApp;
