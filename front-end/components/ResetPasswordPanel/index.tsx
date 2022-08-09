import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import _CONF from 'config/config';
import { useRouter } from 'next/router';
import AuthPanel from 'components/AuthPanel';
import Swal from 'sweetalert2';
import md5 from 'md5';

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

function ResetPasswordPanel() {
  const router = useRouter();

  const { user } = router.query;

  const [errorMessage, setErrorMessage] = useState({
    trigger: false,
    message: '',
  });

  const schema = yup.object().shape({
    password: yup
      .string()
      .required('New password must not be empty')
      .min(8, 'Password must have 8-16 character')
      .max(16, 'Password must have 8-16 character')
      .matches(
        _CONF.REGEX_USENAME_PASSWORD,
        'Password must not contain special character like @#$^...'
      ),
    confirmPassword: yup
      .string()
      .required('Confirm password must not be empty')
      .min(8, 'Confirm password must have 8-16 character')
      .max(16, 'Confirm password must have 8-16 character')
      .oneOf(
        [yup.ref('password'), null],
        'Confirm password does not match with new password'
      ),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ResetPasswordForm> = async (data) => {
    try {
      const { password } = data;
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/reset-password`,
        {
          token: user,
          password: md5(password),
        }
      );

      if (res.data.success) {
        setErrorMessage({
          trigger: false,
          message: '',
        });

        Swal.fire({
          title: 'Reset success, click button to go sign in page',
          confirmButtonText: "Let's go",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push('/sign-in');
          }
        });
      }
    } catch (error: any) {
      setErrorMessage({
        trigger: true,
        message: error.response.data.error.message,
      });
    }
    reset({
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <AuthPanel>
      <div className="header d-flex justify-content-between align-item-center">
        <h2>Reset password</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('password')}
          placeholder="Enter new password"
          type="password"
          required
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <input
          {...register('confirmPassword')}
          placeholder="Enter confirm password"
          type="password"
          required
        />
        {(errors.confirmPassword && (
          <p className="error">{errors.confirmPassword.message}</p>
        )) ||
          (errorMessage.trigger && (
            <p className="error">{errorMessage.message}</p>
          ))}
        <button type="submit" className="button__search">
          Submit
        </button>
      </form>
    </AuthPanel>
  );
}

export default ResetPasswordPanel;
