/* eslint-disable */
import AuthPanel from 'components/AuthPanel';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function SignUpSuccess() {
  const [message, setMessage] = useState('This is a wrong activate link');
  //User firstTimer to prevent rerendering too much
  const [firstTimer, setFirstTimer] = useState(true); 
  const handleActivateAccount = async (postData: string) => {
    try {
      const res = await axios
        .get(
          process.env.NEXT_PUBLIC_DOMAIN +
            '/api/auth/activate_account/' +
            postData
        )
        .then((res) => {
          if (!res.data.success) {
            setMessage('This is a wrong activate link');
            setFirstTimer(false);
          } else {
            setMessage('Your account have been activate');
          }
        });
    } catch (error) {
      //TODO: handle error
    }
  };
  const router = useRouter();
  const { user } = router.query;

  if (user && firstTimer) {
    handleActivateAccount(user.toString());
  }

  return (
    <AuthPanel>
      <div className="header d-flex justify-content-between align-item-center">
        <h4>{message}</h4>
      </div>
      <Link href="/sign-in">
        <button type="submit" className="button__signup">
          Click here to start sign-in
        </button>
      </Link>
    </AuthPanel>
  );
}
