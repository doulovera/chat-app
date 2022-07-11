
import useModal from '@hooks/useModal';
import { X } from 'phosphor-react';

export default function Modal () {
  const { closeModal, modalChild } = useModal();

  return (
    <div
      id="app-modal"
      className="translate-x-full fixed top-0 right-0 z-50 h-screen w-screen py-4 px-6 bg-primary-darker transition-transform ease-in-out duration-200"
    >
      <div className="w-4/5 max-w-sm mx-auto">
        <div className="flex justify-end">
          <button onClick={closeModal}>
            <X size={32} />
          </button>
        </div>
        {modalChild}
      </div>
    </div>
  );
}
