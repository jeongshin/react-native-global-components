import React, { createElement } from 'react';
import PopupManager, { PopupManagerConfigs } from './PopupManager';
import PopupPortal from './PopupPortal';
import { InferProps } from '../../types/utils';
import { getUniqueComponentName } from '../../utils';

function createPopupFactory<T extends React.FC<any>, P extends InferProps<T>>(
  Component: T,
  givenName?: string,
) {
  const name = givenName ?? getUniqueComponentName(Component);

  PopupManager.setComponent({ name, Component });

  return {
    show: (...[props]: undefined extends P ? [] : [P]): void =>
      PopupManager.render({ name, props }),

    hide: (): void => PopupManager.remove({ name }),

    clear: (): void => PopupManager.clear(),

    setConfigs: (configs: PopupManagerConfigs): void =>
      PopupManager.setConfigs(configs),

    Portal: createElement(PopupPortal, { name }),
  };
}

export default createPopupFactory;
