import React, { useEffect, useState } from 'react';
import GlobalComponentController from '../manager/GlobalComponentController';

const useGlobalComponentState = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const subscription = GlobalComponentController.subscribe();
  }, []);

  return {
    //
  };
};

export default useGlobalComponentState;
