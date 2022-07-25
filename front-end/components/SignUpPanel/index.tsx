import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import _CONF from 'config/config';
import AuthPanel from 'components/AuthPanel';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface SignUpForm {
  // eslint-disable-next-line camelcase
  full_name: string;
  email: string;
  username: string;
  password: string;
  passwordConfirmation?: string;
}

function SignUpPanel() {
  const router = useRouter();
  const [err, setErr] = useState({ error: false, message: '' });

  const schema = yup.object().shape({
    // eslint-disable-next-line camelcase
    full_name: yup
      .string()
      .required('Full name must not be empty')
      .min(8, 'Full name must have 8-50 character')
      .max(50, 'Full name must have 8-50 character')
      .matches(
        _CONF.REGEX_FULLNAME,
        'Full name must not contain special character like @#$^...'
      ),
    email: yup.string().email('Email must be in correct format'),
    username: yup
      .string()
      .required('Username must not be empty')
      .min(8, 'Username must have 8-32 character')
      .max(32, 'Username must have 8-32 character')
      .matches(
        _CONF.REGEX_USENAME_PASSWORD,
        'Username must not contain special character like @#$^...'
      ),
    password: yup
      .string()
      .required('Password must not be empty')
      .min(8, 'Password must have 8-16 character')
      .max(316, 'Password must have 8-16 character')
      .matches(
        _CONF.REGEX_USENAME_PASSWORD,
        'Password must not contain special character like @#$^...'
      ),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    delete data.passwordConfirmation;
    try {
      await axios
        .post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/register`, data)
        .then((res) => {
          if (!res.data.success) {
            setErr({ error: true, message: res.data.error.message });
          } else {
            router.push('/sign-up-success');
            setErr({ error: false, message: 'Create account success' });
          }
        });
    } catch (err: any) {
      // handle error
      setErr({ error: true, message: err.response.data.error.message });
    }
  };
  return (
    <AuthPanel>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Register</h2>
        <label className="info"> Full name </label>
        <input
          {...register('full_name')}
          placeholder="Enter your full name"
          type="text"
          required
        />
        {errors.full_name && (
          <p className="error">{errors.full_name.message}</p>
        )}
        <label className="info"> Email </label>
        <input
          {...register('email')}
          placeholder="Enter your email"
          type="text"
          required
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
        <label className="info"> Username </label>
        <input
          {...register('username')}
          placeholder="Enter your username"
          type="text"
          required
        />
        {errors.username && <p className="error">{errors.username.message}</p>}
        <label className="info"> Password </label>
        <input
          {...register('password')}
          placeholder="Enter your password"
          type="password"
          required
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
        <label className="info"> Checking password </label>
        <input
          {...register('passwordConfirmation')}
          placeholder="Re-enter your password"
          type="password"
          required
        />
        {errors.passwordConfirmation && (
          <p className="error">{errors.passwordConfirmation.message}</p>
        )}
        <br />
        {!err.error ? (
          <p className="error">{err.message}</p>
        ) : (
          <>
            <p className="error">{err.message}</p>
          </>
        )}
        <button className="button__signup" type="submit">
          CREATE ACCOUNT
        </button>
      </form>
      <div className="linkToSignup">
        <p>Already have an account ?</p>
        <Link href="/sign-in">
          <a>Sign-in now</a>
        </Link>
      </div>
    </AuthPanel>
  );
}

export default SignUpPanel;
