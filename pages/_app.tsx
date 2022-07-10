import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '@components/shared/Header';
import useAuth from '@hooks/useAuth';

function MyApp ({ Component, pageProps }: AppProps) {
  useAuth();
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
