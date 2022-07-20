import { useEffect } from 'react';
import { onAuthChanged } from '@services/auth';
import { useUser } from '@store';
import { useRouter } from 'next/router';

export default function useAuth () {
  const store = useUser();
  const router = useRouter();

  useEffect(() => {
    onAuthChanged((user) => {
      if (user !== null && !store.isActive) {
        store.setUser(user);
      }

      if (user !== null && store.isActive) {
        router.push('/chat');
      }
    });
  }, []);
}
