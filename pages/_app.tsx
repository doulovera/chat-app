import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import useAuth from '@hooks/useAuth';
import { ModalContext } from 'context/ModalContext';
import Modal from '@components/shared/Modal';
import '../styles/globals.css';
import '../styles/nprogress.css';
// types
import type { AppProps } from 'next/app';

function MyApp ({ Component, pageProps }: AppProps) {
  useAuth();
  const [modalChild, setModalChild] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on('routeChangeStart', handleRouteStart);
    Router.events.on('routeChangeComplete', handleRouteDone);
    Router.events.on('routeChangeError', handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off('routeChangeStart', handleRouteStart);
      Router.events.off('routeChangeComplete', handleRouteDone);
      Router.events.off('routeChangeError', handleRouteDone);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <ModalContext.Provider value={{
        modalRef: typeof window !== 'undefined' ? document.getElementById('app-modal') : null,
        modalChild,
        setModalChild,
      }}
      >
        <div className="relative bg-primary-dark text-white min-h-screen min-h-screen pt-16 min-w-[320px]">
          <Component {...pageProps} />
          <Modal />
        </div>
      </ModalContext.Provider>
    </>
  );
}

export default MyApp;
