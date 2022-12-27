import React from 'react';
import ConfirmationPopUpContext, {
  ConfirmationPopUpProps,
} from './ConfirmationPopUpContext';
import useGlobalComponent from '@/global-components/hooks/useGlobalComponent';
import { GlobalComponentDisplayName } from '@/types';

const ConfirmationPopUp = () => {
  const { visible, state } = useGlobalComponent<ConfirmationPopUpProps>(
    GlobalComponentDisplayName.ConfirmationPopUp,
  );

  if (!visible || !state) return;

  // const Component =

  return (
    <ConfirmationPopUpContext.Provider value={state}>
      {}
    </ConfirmationPopUpContext.Provider>
  );
};

export default ConfirmationPopUp;
