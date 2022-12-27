import React, { useEffect } from 'react';
import useGlobalComponent from './global/useGlobalComponent';

const App = () => {
  const { show } = useGlobalComponent();

  useEffect(() => {
    show('ConfirmationPopUp', { text: '123' });
  }, []);

  return <></>;
};
