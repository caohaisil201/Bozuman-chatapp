import React, {useState, useEffect} from 'react'
import ForgotPasswordPanel from 'components/ForgotPasswordPanel'
import Image from 'next/image'
import router from 'next/router';
import { checkAuth } from 'components/ProtectedRoute';
import Loading from 'components/Loading';

function ForgotPassword() {
  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    async function checkLogIn() {
      if(await checkAuth(router)){
        setIsLogIn(true);
      }
    }
  
    checkLogIn()
  }, [isLogIn]);

  return (
    isLogIn ? <div className="container">
      <div className="row mt-5">
        <div className="col-0 mt-5 col-lg-6 d-flex justify-content-center">
          <Image
            src={'/homepage.png'}
            alt="homepage"
            width={560}
            height={640}
          />
        </div>
        <div className="col-12 col-lg-6 d-flex justify-content-center align-self-center">
          <div className="forgotpassword">
            <ForgotPasswordPanel />
          </div>
        </div>
      </div>
    </div> : <Loading />
  )
}

export default ForgotPassword
