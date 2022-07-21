import { Plus } from 'phosphor-react';
import useModal from '@hooks/useModal';
// types
import type { ReactElement } from 'react';
import CreateConvoContent from './CreateConvoContent';
// import JoinConvoContent from './JoinConvoContent';

function HeroButton (
  { icon, label, handleClick } : { icon: ReactElement, label: string, handleClick: () => void },
) {
  return (
    <div className="grid place-items-center">
      <button
        className="grid place-items-center h-16 w-16 mb-2 text-black bg-gray-600 rounded-full"
        onClick={handleClick}
      >
        {icon}
      </button>
      <p className="text-sm text-center">
        {label}
      </p>
    </div>
  );
}

export default function CreateOrJoinCard () {
  const { openModal, setModalChild } = useModal();

  const handleCreate = () => {
    setModalChild(<CreateConvoContent />);
    openModal();
  };

  return (
    <div
      className="absolute h-36 w-4/5 min-w-[280px] max-w-md top-0 bottom-0 right-0 left-0 mx-auto bg-primary-dark rounded-xl shadow-xl z-10"
      style={{
        backgroundImage: 'url(/images/sprinkle.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex items-center justify-around gap-2 h-full w-3/4 mx-auto">
        <HeroButton
          icon={<Plus size={32} weight="bold" color="#dedede" />}
          label="Create Conversation"
          handleClick={handleCreate}
        />
      </div>
    </div>
  );
}
