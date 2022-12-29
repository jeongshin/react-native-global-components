import React, { useEffect, useState } from 'react';
import ConfirmationPopUpContext from './ConfirmationPopUpContext';
import GlobalComponentController from '@/global-components/manager/GlobalComponentController';
import GlobalComponentView from '@/global-components/manager/GlobalComponentView';
import { GlobalComponentPropsList } from '@/types';

const ConfirmationPopUpPortalHost = () => {
  const [visible, setVisible] = useState(false);

  const [state, setState] = useState<
    GlobalComponentPropsList['ConfirmationPopUp'] | null
  >(null);

  useEffect(() => {
    const subscription = GlobalComponentController.getSubject()
      .pipe()
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!visible || !state) return null;

  const Component =
    GlobalComponentView.getRegisteredUIComponent('ConfirmationPopUp');

  return (
    <ConfirmationPopUpContext.Provider value={state}>
      {Component && <Component />}
    </ConfirmationPopUpContext.Provider>
  );
};

export default ConfirmationPopUpPortalHost;
