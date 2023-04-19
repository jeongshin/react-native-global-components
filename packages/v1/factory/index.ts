import React, { createElement } from 'react';
import PopupManager from '../manager';
import Provider from '../provider';
import { PopupContext } from '../types';

export function createPopup<T>(Component: React.FC<T>) {
  const context = React.createContext<PopupContext<T>>({} as any);

  const internalRef = React.createRef<PopupContext<T>>();

  function show(props: T) {
    if (!internalRef.current) {
      return console.warn(
        '[react-native-global-components] can not find context make sure rendering Provider',
      );
    }

    internalRef.current.show(props);
  }

  async function hide() {
    if (!internalRef.current) {
      return console.warn(
        '[react-native-global-components] can not find context make sure rendering Provider',
      );
    }

    await internalRef.current.hide();
  }

  PopupManager.registerRef(genUniqueComponentName(Component), internalRef);

  return {
    show,
    hide,
    Portal: ({ children }: { children?: React.ReactNode }) =>
      createElement(
        context.Provider,
        { value: { show, hide } },
        createElement(Provider<T>, { Component, internalRef }, children),
      ),
  };
}

function genUniqueComponentName<T extends React.FC<any>>(Component: T) {
  const unique = Math.round(Math.random() * 1234567890);
  return `${
    Component.name || Component.displayName || `GlobalComponent`
  }${unique}`;
}
