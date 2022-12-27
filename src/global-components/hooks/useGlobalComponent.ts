import React, { useEffect, useState } from 'react';
import GlobalComponentManager from '../GlobalComponentStateManager';
import { GlobalComponentDisplayName } from '@/types';

const useGlobalComponent = <T>(name: GlobalComponentDisplayName) => {
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<T | null>(null);

  useEffect(() => {
    const unsubscribe = GlobalComponentManager.subscribe(
      name,
      (nextState: T) => {
        setVisible(true);
        setState(nextState);
      },
    );

    return () => unsubscribe();
  }, []);

  return {
    visible,
    state,
  };
};

export default useGlobalComponent;
