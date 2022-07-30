import { useState } from 'react';
import ThreeDots from '@components/shared/ThreeDots';
import { TrashSimple } from 'phosphor-react';
import useModal from '@hooks/useModal';
import DeleteConversationConfirm from './DeleteConversationConfirm';

type Props = {
  roomId: string;
}

export default function ConversationOperations ({ roomId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal, closeModal, setModalChild } = useModal();

  const handleOpenModal = () => {
    setModalChild(<DeleteConversationConfirm roomId={roomId} closeModal={closeModal} />);
    openModal();
    setIsOpen(false);
  };

  const buttons = [
    {
      label: 'Delete',
      onClick: handleOpenModal,
      color: 'text-red-500',
      icon: <TrashSimple size={20} weight="regular" />,
    },
  ];

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <div className={`${isOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'} group-hover:opacity-100 overflow-hidden group-hover:max-w-full transition-[max-width,opacity] duration-150 ease-in-out`}>
        <ThreeDots handleClick={() => setIsOpen((prev) => !prev)} />
      </div>
      <div
        className={`${isOpen ? '' : 'hidden'} absolute z-40 top-7 right-2 w-36 transition ease-in-out bg-white rounded-md shadow-md py-2`}
      >
        {
          buttons.map((button, index) => (
            <button
              key={index}
              className={`flex items-center justify-between w-full px-2 py-1 hover:bg-gray-100 ${button?.color || 'text-black'} outline-none border-none`}
              onClick={button.onClick}
            >
              <span className="flex-1 flex items-center gap-3">
                {button.icon}
                <span>{button.label}</span>
              </span>
            </button>
          ))
        }
      </div>
    </div>
  );
}
