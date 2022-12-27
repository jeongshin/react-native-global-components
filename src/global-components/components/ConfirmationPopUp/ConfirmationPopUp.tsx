import React from 'react';
import ConfirmationPopUpContext, {
  ConfirmationPopUpProps,
} from './ConfirmationPopUpContext';
import useGlobalComponentPortal from '@/global-components/hooks/useGlobalComponentPortal';
import GlobalComponentUIManager from '@/global-components/manager/GlobalComponentUIManager';
import { GlobalComponentDisplayName } from '@/types';

const ConfirmationPopUp = () => {
  const name = GlobalComponentDisplayName.ConfirmationPopUp;

  const { visible, state } =
    useGlobalComponentPortal<ConfirmationPopUpProps>(name);

  if (!visible || !state) return;

  const Component = GlobalComponentUIManager.getRegisteredUIComponent(name);

  return (
    <ConfirmationPopUpContext.Provider value={state}>
      {Component && <Component />}
    </ConfirmationPopUpContext.Provider>
  );
};

export default ConfirmationPopUp;
