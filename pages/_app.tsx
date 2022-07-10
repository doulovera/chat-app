import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '@components/shared/Header';
import useAuth from '@hooks/useAuth';

function MyApp ({ Component, pageProps }: AppProps) {
  useAuth();
  return (
    <div className="bg-primary-dark text-white h-screen min-w-[320px]">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
