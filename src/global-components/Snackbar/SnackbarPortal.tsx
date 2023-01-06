import React from 'react';
import { PortalProps } from '../../types';
import {
  GlobalComponentContext,
  UpdateGlobalComponentContext,
} from '../context';
import SnackbarManager from './SnackbarManager';
import useSnackbar from './useSnackbar';

const SnackbarPortal: React.FC<PortalProps> = ({ name }) => {
  const { state, updateState } = useSnackbar(name);

  const Component = SnackbarManager.getComponent(name);

  if (!Component || !state) return <></>;

  return (
    <GlobalComponentContext.Provider value={state}>
      <UpdateGlobalComponentContext.Provider value={updateState}>
        <Component {...state} />
      </UpdateGlobalComponentContext.Provider>
    </GlobalComponentContext.Provider>
  );
};

export default SnackbarPortal;
