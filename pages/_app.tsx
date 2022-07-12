import React, { useState } from 'react';
import '../styles/globals.css';
import useAuth from '@hooks/useAuth';
import { ModalContext } from 'context/ModalContext';
import Modal from '@components/shared/Modal';
// types
import type { AppProps } from 'next/app';

function MyApp ({ Component, pageProps }: AppProps) {
  useAuth();
  const [modalChild, setModalChild] = useState<React.ReactNode | null>(null);

  return (
    <ModalContext.Provider value={{
      modalRef: typeof window !== 'undefined' ? document.getElementById('app-modal') : null,
      modalChild,
      setModalChild,
    }}
    >
      <div className="relative bg-primary-dark text-white min-h-screen h-screen pt-16 min-w-[320px]">
        <Component {...pageProps} />
        <Modal />
      </div>
    </ModalContext.Provider>
  );
}

export default MyApp;
