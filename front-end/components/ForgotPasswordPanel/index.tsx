import React, { useState, MouseEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FaSignInAlt } from 'react-icons/fa';
import AuthPanel from 'components/AuthPanel';

interface ForgotPasswordForm {
  email: string;
}

function ForgotPasswordPanel() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState({
    trigger: false,
    message: '',
  });

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Email must not be empty')
      .email('Email must be in format'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const onBackSignIn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/sign-in');
  };

  const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/forgot-password`,
        data
      );
      if (res.status === 200) {
        setErrorMessage({
          trigger: false,
          message: '',
        });

        const email: string = res.data.email;
        await axios.post(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/create-code`,
          {
            email,
          }
        );

        router.push({
          pathname: '/enter-forgot-password-code',
          query: {
            email: res.data.email,
          },
        });
      }
    } catch (error: any) {
      setErrorMessage({
        trigger: true,
        message: error.response.data.error.message,
      });
    }
    reset({ email: '' });
  };

  return (
    <AuthPanel>
      <div className="header d-flex justify-content-between align-item-center">
        <h2>Forgot password</h2>
        <button className="goSignIn" onClick={onBackSignIn}>
          <FaSignInAlt />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('email')}
          placeholder="Type your email"
          type="email"
          required
        />
        <div className="errorMessage">
          {(errors.email && <p>{errors.email.message}</p>) ||
            (errorMessage.trigger && <p>{errorMessage.message}</p>)}
        </div>

        <button type="submit" className="button__search">
          Search
        </button>
      </form>
    </AuthPanel>
  );
}

export default ForgotPasswordPanel;
