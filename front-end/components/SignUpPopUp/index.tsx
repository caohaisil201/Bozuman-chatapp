import AuthPanel from 'components/AuthPanel';
import Link from 'next/link';
export default function SignUpPopUp() {
  return (
    <AuthPanel>
      <div className="header d-flex justify-content-between align-item-center">
        <h4>
          Your account have been created. Go check your email to activate your
          account
        </h4>
      </div>
      <Link href="/sign-in">
        <button type="submit" className="button__signup">
          Go back to Sign-in page
        </button>
      </Link>
    </AuthPanel>
  );
}
