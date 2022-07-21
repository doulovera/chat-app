import AddParticipantContent from '@components/conversation/AddParticipantContent';
import useModal from '@hooks/useModal';
import { useUser } from '@store';
import Link from 'next/link';
import { ArrowLeft, SignOut, UserPlus } from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';
import SignInButton from './SignInButton';

type ConditionalChat = (
  | {
    isChat?: true,
    participantCount: number,
    roomId: string,
  }
  | {
    isChat?: false,
    participantCount?: undefined,
    roomId?: undefined,
  }
);

type Props = {
  title: string,
} & ConditionalChat;

export default function Header ({ title, isChat, roomId, participantCount }: Props) {
  const profilePopupRef = useRef<HTMLDivElement>(null);
  const store = useUser();
  const { logOutUser } = store;
  const { openModal, setModalChild } = useModal();

  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (store.user) {
      setUserId(store.user?.uid);
    }
  }, [store.user?.uid]);

  const handlePopupElementClick = (onClick: () => void) => {
    profilePopupRef.current?.classList.toggle('hidden');
    onClick();
  };

  return (
    <header className="fixed z-50 top-0 flex items-center w-full h-16 px-4 bg-primary-darker">
      <div className="relative flex items-center justify-between w-full max-w-sm mx-auto">
        <h1 className="text-2xl">
          {
            !isChat
              ? (
                <Link href="/chat">
                  <a className="font-bold uppercase">{title}</a>
                </Link>
                )
              : (
                <div>
                  <Link href="/chat">
                    <a className="font-bold">
                      <ArrowLeft size={26} style={{ display: 'inline-block', marginRight: '6px' }} />
                      {
                        title?.length > 11
                          ? title.slice(0, 11) + '...'
                          : title
                      }
                    </a>
                  </Link>
                  <p className="text-xs ml-8">
                    {participantCount} {participantCount === 1 ? 'participant' : 'participants'}
                  </p>
                </div>
                )
          }
        </h1>
        <div className="w-16" />
        <div className="w-20 text-center">
          <SignInButton profilePopupRef={profilePopupRef} />
        </div>
        <div
          ref={profilePopupRef}
          className="hidden absolute z-50 -bottom-28 right-6 w-full max-w-[120px] transition ease-in-out bg-white rounded-md shadow-md py-2"
        >
          {
            typeof window !== 'undefined' && isChat
              ? (
                <button
                  className="flex items-center justify-between w-full px-2 py-1 hover:bg-gray-100 text-black outline-none border-none"
                  onClick={() => handlePopupElementClick(() => {
                    openModal();
                    setModalChild(<AddParticipantContent roomId={roomId} />);
                  })}
                >
                  <UserPlus size={18} />
                  <span className="flex-1">
                    Add user
                  </span>
                </button>
                )
              : null
          }
          <button
            className="flex items-center justify-between w-full px-2 py-1 hover:bg-gray-100 text-black outline-none border-none"
            onClick={() => handlePopupElementClick(() => logOutUser())}
          >
            <SignOut size={18} />
            <span className="flex-1">
              Sign out
            </span>
          </button>
          <p className="text-sm py-1 mt-2 border-t-2 text-black text-center opacity-50">
            ID: {userId}
          </p>
        </div>
      </div>
    </header>
  );
}
