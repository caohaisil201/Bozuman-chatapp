
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import _CONF from 'config/config';
interface SignUpForm {
  fullName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

function SignUpPanel() {
  const [err, setErr] = useState({ error: false, message: '' });

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .min(8, 'Full name must have 8-50 character')
      .max(50, 'Full name must have 8-50 character')
      .required('Full name must not be empty')
      .matches(
        _CONF.REGEX_FULLNAME,
        'Full name must not contain special character like @#$^...'
      ),
    email: yup.string().email('Email must be in correct format'),
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
      .max(316, 'Password must have 8-16 character')
      .required('Password must not be empty')
      .matches(
        _CONF.REGEX_USENAME_PASSWORD,
        'Password must not contain special character like @#$^...'
      ),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref('password'), null],
        'Password and confirm password does not match'
      ),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    try {
      const { confirmPassword, ...postData } = data;
      const res = await axios
        .post(process.env.NEXT_PUBLIC_DOMAIN + '/api/auth/register', postData)
        .then((res) => {
          if (res.data == 'Username already exist') {
            setErr({ error: true, message: 'Username repeat' });
          } else if (res.data == 'Email already exist') {
            setErr({ error: true, message: 'Email repeat' });
          } else if (res.data == 'Create account success') {
            setErr({ error: false, message: 'Create account success' });
          }
        });
    } catch (error) {
      // handle error
    }
  };
  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Register</h2>
        <input
          {...register('fullName')}
          placeholder='Enter your full name'
          type='text'
          required
        />
        {errors.fullName && <p>{errors.fullName.message}</p>}
        <br />
        <input
          {...register('email')}
          placeholder='Enter your email'
          type='text'
          required
        />
        {errors.email && <p>{errors.email.message}</p>}
        <br />
        <input
          {...register('username')}
          placeholder='Enter your username'
          type='text'
          required
        />
        {errors.username && <p>{errors.username.message}</p>}
        <br />
        <input
          {...register('password')}
          placeholder='Enter your password'
          type='password'
          required
        />
        {errors.password && <p>{errors.password.message}</p>}
        <br />
        {!err.error ? <></> : <><p>{err.message}</p><br /></>}
        <button type='submit'>CREATE ACCOUNT</button>
      </form>
    </div>
  );
}

export default SignUpPanel;
