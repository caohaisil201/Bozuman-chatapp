import 'styles/index.scss';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import ProtectedRoute from 'components/ProtectedRoute';

function MyApp({ Component, pageProps, router }: AppProps) {


  return (
    <>
      <ProtectedRoute router={router}>
        <SWRConfig>
          <Component {...pageProps} />
        </SWRConfig>
      </ProtectedRoute>
    </>
  );
}

export default MyApp;
