import { useContext } from 'react';
import { ModalContext } from 'context/ModalContext';
// types
import type { ReactNode } from 'react';

type ModalContextTypes = {
  modalRef: HTMLDivElement,
  modalChild: ReactNode,
  setModalChild: (child: ReactNode) => void,
}

const useModal = () => {
  const { modalRef, modalChild, setModalChild } = useContext(ModalContext) as ModalContextTypes;

  const openModal = () => {
    modalRef.classList.remove('translate-x-full');
    modalRef.classList.add('translate-x-0');
  };

  const closeModal = () => {
    modalRef.classList.remove('translate-x-0');
    modalRef.classList.add('translate-x-full');
  };

  return {
    modalChild,
    openModal,
    closeModal,
    setModalChild,
  };
};

export default useModal;
