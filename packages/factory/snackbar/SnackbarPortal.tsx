import React, { useState } from 'react';
import SnackbarManager from './SnackbarManager';
import useSnackbar from './useSnackbar';
import {
  GlobalComponentContext,
  UpdateGlobalComponentContext,
} from '../../context';
import type { PortalProps } from '../../types';

const SnackbarPortal: React.FC<PortalProps> = ({ name }) => {
  const { state, visible, updateState } = useSnackbar(name);

  const [Component] = useState(() => SnackbarManager.getComponent(name));

  if (!visible) return <></>;

  if (!Component || state === null) return <></>;

  return (
    <GlobalComponentContext.Provider value={state}>
      <UpdateGlobalComponentContext.Provider value={updateState}>
        <Component {...state} />
      </UpdateGlobalComponentContext.Provider>
    </GlobalComponentContext.Provider>
  );
};

export default SnackbarPortal;
