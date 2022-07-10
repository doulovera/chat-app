import { useUser } from '@store';
import Link from 'next/link';
import { useRef } from 'react';
import SignInButton from './SignInButton';

export default function Header () {
  const profilePopupRef = useRef<HTMLDivElement>(null);
  const store = useUser();
  const { logOutUser } = store;

  const handlePopupElementClick = (onClick: () => void) => {
    profilePopupRef.current?.classList.toggle('hidden');
    onClick();
  };

  return (
    <header className="relative flex items-center justify-between h-14 max-w-sm mx-auto px-4">
      <div className="w-16" />
      <h1 className="text-2xl font-bold uppercase">
        <Link href="/chat">
          <a>chat-app</a>
        </Link>
      </h1>
      <div className="w-20 text-center">
        <SignInButton profilePopupRef={profilePopupRef} />
      </div>
      <div
        ref={profilePopupRef}
        className="hidden absolute -bottom-12 right-10 w-full max-w-[120px] transition ease-in-out bg-white rounded-md shadow-md py-2"
      >
        <button className="w-full py-1 hover:bg-gray-100 outline-none border-none" onClick={() => handlePopupElementClick(() => logOutUser())}>
          Sign out
        </button>
      </div>
    </header>
  );
}
