import { useEffect, useState } from 'react';
import { logInGithub } from '@services/auth';
import { useUser } from '@store';

export default function SignInButton () {
  const store = useUser();
  const [isActive, setIsActive] = useState<boolean | 'IDLE'>('IDLE');

  useEffect(() => {
    setIsActive(store.isActive);
  }, [store.isActive]);

  if (!isActive) {
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

  if (isActive && isActive !== 'IDLE') {
    return (
      <div>
        <span>{store.user?.username}</span>
      </div>
    );
  };

  return (
    <div>Loading...</div>
  );
}
