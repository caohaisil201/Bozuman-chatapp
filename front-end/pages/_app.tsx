import 'styles/index.scss';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <SWRConfig>
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}

export default MyApp;
