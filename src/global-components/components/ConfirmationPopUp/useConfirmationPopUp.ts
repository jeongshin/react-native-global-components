import React, { useContext } from 'react';
import ConfirmationPopUpContext from './ConfirmationPopUpContext';

const useConfirmationPopUp = () => {
  const context = useContext(ConfirmationPopUpContext);

  if (!context) {
    throw new Error('[ConfirmationPopUp] no context found');
  }

  return context;
};

export default useConfirmationPopUp;
