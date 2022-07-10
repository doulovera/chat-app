import { useEffect } from 'react';

export default function useAsyncEffect (
  effect: () => AsyncGenerator | Promise<void>,
  deps = [],
) {
  useEffect(() => {
    const asyncEffect = async () => {
      await effect();
    };
    asyncEffect();
  }, [...deps]);
};
