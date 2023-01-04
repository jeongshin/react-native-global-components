import React from 'react';
import { PortalProps } from '../../types';
import {
  GlobalComponentContext,
  UpdateGlobalComponentContext,
} from '../context';
import SnackBarManager from './SnackBarManager';
import useSnackBar from './useSnackBar';

const SnackBarPortal: React.FC<PortalProps> = ({ name }) => {
  const { state, updateState } = useSnackBar(name);

  const Component = SnackBarManager.getComponent(name);

  if (!Component || !state) return <></>;

  return (
    <GlobalComponentContext.Provider value={state}>
      <UpdateGlobalComponentContext.Provider value={updateState}>
        <Component {...state} />
      </UpdateGlobalComponentContext.Provider>
    </GlobalComponentContext.Provider>
  );
};

export default SnackBarPortal;
