import React from 'react';
import ConfirmationPopUpContext from './ConfirmationPopUpContext';
import GlobalComponentUIManager from '@/global-components/manager/GlobalComponentView';

const ConfirmationPopUp = () => {
  // const name = GlobalComponentDisplayName.ConfirmationPopUp;

  // const { visible, state } =
  //   useGlobalComponentPortal<ConfirmationPopUpProps>(name);

  // if (!visible || !state) return;

  const Component =
    GlobalComponentUIManager.getRegisteredUIComponent('ConfirmationPopUp');

  return (
    <ConfirmationPopUpContext.Provider value={state}>
      {Component && <Component />}
    </ConfirmationPopUpContext.Provider>
  );
};

export default ConfirmationPopUp;
