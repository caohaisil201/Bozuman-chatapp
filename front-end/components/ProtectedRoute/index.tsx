import axiosClient from 'helper/axiosClient';
import { appRoutes } from '../../constant/appRoutes';
//TODO: fix type of Props
interface Props {
  router: any,
  children: any,
}

const unProtectedRoutes = [
  appRoutes.SIGN_IN_PAGE,
  appRoutes.SIGN_UP_PAGE,
  appRoutes.FORGOT_PASSWORD_PAGE,
  appRoutes.RESET_PASSWORD_PAGE,
  appRoutes.SIGN_UP_SUCCESS_PAGE,
  appRoutes.ACTIVATE_ACCOUNT_PAGE,
]

const allRoutes = unProtectedRoutes.concat(appRoutes.HOME_PAGE,appRoutes.PROFILE_PAGE);

async function checkLogin() {
  const res: any = await axiosClient.get(`/`).then(res => res);
  if(res.response){
    return false;
  }
  return true;
}

export async function checkAuth(router: any) {
  if(!allRoutes.includes(router.pathname)){
    return;
  }
  const pathIsProtected = unProtectedRoutes.indexOf(router.pathname) === -1;
  const isLogin: boolean = await checkLogin();
  if(pathIsProtected && !isLogin) {
    router.push('/sign-in');
    return false;
  }else if(!pathIsProtected && isLogin){
    router.push('/');
    return false;
  }
  return true;
}


