/* eslint-disable */

import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import Image from 'next/image'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import _CONF from 'config/config'
import { useRouter } from 'next/router'
import { setCookie } from 'cookies-next'
import AuthPanel from 'components/AuthPanel'

interface SignInForm {
  username: string
  password: string
}

function SignInPanel() {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState({
    trigger: false,
    message: '',
  })
  const schema = yup.object().shape({
    username: yup
      .string()
      .min(8, 'Username must have 8-32 character')
      .max(32, 'Username must have 8-32 character')
      .required('Username must not be empty')
      .matches(
        _CONF.REGEX_USENAME_PASSWORD,
        'Username must not contain special character like @#$^...'
      ),
    password: yup
      .string()
      .min(8, 'Password must have 8-16 character')
      .max(16, 'Password must have 8-16 character')
      .required('Password must not be empty')
      .matches(
        _CONF.REGEX_USENAME_PASSWORD,
        'Password must not contain special character like @#$^...'
      ),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: yupResolver(schema),
  })
  const onSubmit: SubmitHandler<SignInForm> = async (data) => {
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_DOMAIN + '/api/auth/sign-in',
        data
      )
      setErrorMessage({
        trigger: false,
        message: '',
      })
      setCookie('access_token', res.data.accessToken)
      setCookie('refresh_token', res.data.refreshToken)
      router.push('/')
    } catch (error: any) {
      setErrorMessage({
        trigger: true,
        message: error.response.data.error.message,
      })
    }
    reset({ password: '' })
  }
  return (
    <AuthPanel>
      <form onSubmit={handleSubmit(onSubmit)}>
<<<<<<< HEAD
        <h2>SIGN IN</h2>
        <label className='info'> Username </label>
=======
        <h2>Sign in</h2>
        <label className="info"> Username </label>
>>>>>>> eb563a191004fc692f42ef757b3b031629ddfee7
        <input
          {...register('username')}
          placeholder="Type your username"
          type="text"
          required
        />
        {errors.username && <p className="error">{errors.username.message}</p>}
<<<<<<< HEAD
        <label className='info'> Password </label>
=======
        <label className="info"> Password </label>
>>>>>>> eb563a191004fc692f42ef757b3b031629ddfee7
        <input
          {...register('password')}
          placeholder="Type your password"
          type="password"
          required
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
        <br />
<<<<<<< HEAD
        {errorMessage.trigger && <p >{errorMessage.message}</p>}
=======
        {errorMessage.trigger && (
          <p className="error">{errorMessage.message}</p>
        )}
>>>>>>> eb563a191004fc692f42ef757b3b031629ddfee7
        <div>
          <a>Forgot password?</a>
        </div>
        <button type="submit" className="button__signin">
          Continue
        </button>
        <div className="linkToSignup">
          <p>Don&apos;t have an account?</p>
          <button className="button__signup">
            <a>Create new</a>
          </button>
        </div>
      </form>
    </AuthPanel>
  )
}

export default SignInPanel
