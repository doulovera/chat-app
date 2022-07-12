import { useUser } from '@store';
import Link from 'next/link';
import { SignOut } from 'phosphor-react';
import { useRef } from 'react';
import SignInButton from './SignInButton';

type ConditionalChat = (
  | {
    isChat?: true,
    participantCount: number,
  }
  | {
    isChat?: false,
    participantCount?: undefined,
  }
);

type Props = {
  title: string,
} & ConditionalChat;

export default function Header ({ title, isChat, participantCount }: Props) {
  const profilePopupRef = useRef<HTMLDivElement>(null);
  const store = useUser();
  const { logOutUser } = store;

  const handlePopupElementClick = (onClick: () => void) => {
    profilePopupRef.current?.classList.toggle('hidden');
    onClick();
  };

  return (
    <header className="fixed top-0 flex items-center w-full h-16 px-4 bg-primary-darker">
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
                  <a className="font-bold">{title}</a>
                </Link>
                <p className="text-xs">
                  {participantCount} participants
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
          className="hidden absolute z-50 -bottom-12 right-6 w-full max-w-[120px] transition ease-in-out bg-white rounded-md shadow-md py-2"
        >
          <button className="flex items-center justify-between w-full px-2 py-1 hover:bg-gray-100 text-black outline-none border-none" onClick={() => handlePopupElementClick(() => logOutUser())}>
            <SignOut size={18} />
            <span className="flex-1">
              Sign out
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
