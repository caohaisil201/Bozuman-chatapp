import ResetPasswordPanel from 'components/ResetPasswordPanel'
import Image from 'next/image'
import React from 'react'

function EnterCode() {
  return (
    <div className="container">
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
            <ResetPasswordPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnterCode;
