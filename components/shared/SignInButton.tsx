import { useEffect, useState, RefObject } from 'react';
import { logInGithub } from '@services/auth';
import { useUser } from '@store';
import Image from 'next/image';
import Spinner from '@components/icons/spinner';

type Props = {
  profilePopupRef: RefObject<HTMLDivElement>;
}

export default function SignInButton ({ profilePopupRef }: Props) {
  const store = useUser();
  const { user } = store;
  const [isUserActive, setisUserActive] = useState<boolean | 'IDLE'>('IDLE');

  useEffect(() => {
    setisUserActive(store.isActive);
  }, [store.isActive]);

  const handleProfileClick = () => {
    if (profilePopupRef.current) {
      profilePopupRef.current.classList.toggle('hidden');
    }
  };

  if (!isUserActive) {
    return (
      <button
        className="w-full font-bold py-2 px-4 rounded-md"
        onClick={logInGithub}
        type="button"
      >
        Iniciar sesión
      </button>
    );
  };

  if (isUserActive && isUserActive !== 'IDLE') {
    return (
      <button className="flex items-center justify-center w-full" onClick={handleProfileClick}>
        <Image
          src={`https://unavatar.io/github/${user?.username}`}
          alt={`Avatar of ${user?.username} in Github`}
          width="36"
          height="36"
          className="rounded-full"
        />
      </button>
    );
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-gray-200 flex items-center justify-center w-9 h-9 rounded-full">
        <div className="w-6 h-6">
          <Spinner />
        </div>
      </div>
    </div>
  );
}
