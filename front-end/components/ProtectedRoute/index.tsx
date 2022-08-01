import { useLayoutEffect } from 'react';
import axiosClient from 'helper/axiosClient';
import { appRoutes } from '../../constant/appRoutes';
//TODO: fix type of Props
interface Props {
  router: any,
  children: any,
}

const ProtectedRoute = ({router, children}: Props) =>{
  const unProtectedRoutes = [
    appRoutes.SIGN_IN_PAGE,
    appRoutes.SIGN_UP_PAGE,
    appRoutes.FORGOT_PASSWORD_PAGE,
    appRoutes.RESET_PASSWORD_PAGE,
    appRoutes.SIGN_UP_SUCCESS_PAGE,
    appRoutes.ACTIVATE_ACCOUNT_PAGE,
  ]
  
  async function checkLogin() {
    const res: any = await axiosClient.get(`${process.env.NEXT_PUBLIC_DOMAIN}/`).then(res => res);
    if(res.response){
      return false;
    }
    return true;
  }

  async function checkAuth() {
    const pathIsProtected = unProtectedRoutes.indexOf(router.pathname) === -1;
    const isLogin: boolean = await checkLogin();
    if(pathIsProtected && !isLogin) {
      router.push('/sign-in');
    }else if(!pathIsProtected && isLogin){
      router.push('/');
    }
  }

  useLayoutEffect(()=>{
    checkAuth();
  },[])

  return children;
}

export default ProtectedRoute;
