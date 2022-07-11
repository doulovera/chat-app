
import useModal from '@hooks/useModal';
import { X } from 'phosphor-react';

export default function Modal () {
  const { closeModal, modalChild } = useModal();

  return (
    <div
      id="app-modal"
      className="translate-x-full fixed top-0 right-0 z-50 h-screen w-screen p-4 bg-primary-darker ease-in-out duration-300"
    >
      <button
        className="absolute top-0 right-0 m-2"
        onClick={closeModal}
      >
        <X size={32} />
      </button>
      <hr />
      {modalChild}
    </div>
  );
}
