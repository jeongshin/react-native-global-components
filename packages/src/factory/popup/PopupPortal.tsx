import React from 'react';
import PopupManager from './PopupManager';
import usePopup from './usePopup';
import {
  GlobalComponentContext,
  UpdateGlobalComponentContext,
} from '../../context';
import { PortalProps } from '../../types';

const PopupPortal: React.FC<PortalProps> = ({ name }) => {
  const { visible, updateState, state } = usePopup(name);

  if (!visible) return <></>;

  const Component = PopupManager.getComponent(name);

  if (!Component || state === null) return <></>;

  return (
    <GlobalComponentContext.Provider value={state}>
      <UpdateGlobalComponentContext.Provider value={updateState}>
        <Component {...state} />
      </UpdateGlobalComponentContext.Provider>
    </GlobalComponentContext.Provider>
  );
};

export default PopupPortal;
