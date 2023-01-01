import React from 'react';
import PopUpManager from './PopUpManager';
import {
  GlobalComponentContext,
  UpdateGlobalComponentContext,
} from '@/global-components/context/GlobalComponentContext';
import useGlobalComponent from '@/hooks/useGlobalComponent';
import { PortalProps } from '@/types';

const PopUpPortal: React.FC<PortalProps> = ({ name }) => {
  const { visible, updateState, state } = useGlobalComponent(
    PopUpManager,
    name,
  );

  if (!visible || !state) return <></>;

  const Component = PopUpManager.getComponent(name);

  if (!Component) return <></>;

  return (
    <GlobalComponentContext.Provider value={state}>
      <UpdateGlobalComponentContext.Provider value={updateState}>
        <Component />
      </UpdateGlobalComponentContext.Provider>
    </GlobalComponentContext.Provider>
  );
};

export default PopUpPortal;
