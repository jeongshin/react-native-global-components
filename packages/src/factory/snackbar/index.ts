import React, { createElement } from 'react';
import SnackbarManager from './SnackbarManager';
import SnackbarPortal from './SnackbarPortal';
import { InferProps } from '../../types/utils';
import { getUniqueComponentName } from '../../utils';

function createSnackbar<T extends React.FC<any>, P extends InferProps<T>>(
  Component: T,
) {
  const name = getUniqueComponentName(Component);

  SnackbarManager.setComponent({ name, Component });

  return {
    show: (...[props]: undefined extends P ? [] : [P]): void =>
      SnackbarManager.render({ name, props }),

    hide: (): void => SnackbarManager.remove({ name }),

    Portal: createElement(SnackbarPortal, { name }),
  };
}

export default createSnackbar;
