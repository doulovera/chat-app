import { useEffect } from 'react';
import { onAuthChanged } from '@services/auth';
import { useUser } from '@store';

export default function useAuth () {
  const store = useUser();

  useEffect(() => {
    onAuthChanged((user) => {
      if (user !== null && !store.isActive) store.setUser(user);
    });
  }, []);
}
