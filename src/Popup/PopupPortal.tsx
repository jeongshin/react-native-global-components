import React from 'react';
import {
  GlobalComponentContext,
  UpdateGlobalComponentContext,
} from '../context';
import { PortalProps } from '../types';
import PopupManager from './PopupManager';
import usePopup from './usePopup';

const PopupPortal: React.FC<PortalProps> = ({ name }) => {
  const { visible, updateState, state } = usePopup(name);

  if (!visible || !state) return <></>;

  const Component = PopupManager.getComponent(name);

  if (!Component) return <></>;

  return (
    <GlobalComponentContext.Provider value={state}>
      <UpdateGlobalComponentContext.Provider value={updateState}>
        <Component {...state} />
      </UpdateGlobalComponentContext.Provider>
    </GlobalComponentContext.Provider>
  );
};

export default PopupPortal;
