import React, { createElement } from 'react';
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

  return {
    show,
    hide,
    Portal: () =>
      createElement(
        context.Provider,
        { value: { show, hide } },
        createElement(Provider<T>, { Component, internalRef }),
      ),
  };
}
