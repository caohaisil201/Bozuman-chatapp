import React, { useState, MouseEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FaSignInAlt } from 'react-icons/fa';
import AuthPanel from 'components/AuthPanel';
import Swal from 'sweetalert2';

interface ForgotPasswordFormProperty {
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
  } = useForm<ForgotPasswordFormProperty>({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const onBackSignIn = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    router.push('/sign-in');
  };

  const onSubmit: SubmitHandler<ForgotPasswordFormProperty> = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/forgot-password`,
        data
      );
      
      if (res.data.success) {
        setErrorMessage({
          trigger: false,
          message: '',
        });
        Swal.fire({
          icon: 'success',
          title: 'Please check your email to reset password',
          showConfirmButton: false,
        })
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
          {(errors.email && <p className="error">{errors.email.message}</p>) ||
            (errorMessage.trigger && <p className="error">{errorMessage.message}</p>)}
        </div>

        <button type="submit" className="button__search">
          Search
        </button>
      </form>
    </AuthPanel>
  );
}

export default ForgotPasswordPanel;
