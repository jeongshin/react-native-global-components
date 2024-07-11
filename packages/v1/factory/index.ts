import React, { createElement } from 'react';
import PopupManager from '../manager';
import Provider from '../provider';
import { PopupContext } from '../types';

interface Queue<T> {
  props: T;
  promise: Promise<void>;
}

export interface PopupOptions {
  /**
   * if true, multiple popup show request will
   * wait for currently active popup to hide then show
   *
   * if false, popup will show immediately
   *
   * @default false
   */
  shouldWaitForUserInteraction?: boolean;
}

export function createPopup<T>(
  Component: React.FC<T>,
  { shouldWaitForUserInteraction }: PopupOptions = {
    shouldWaitForUserInteraction: false,
  },
) {
  const context = React.createContext<PopupContext<T>>({} as any);

  const internalRef = React.createRef<PopupContext<T>>();

  const queue: Queue<T>[] = [];

  async function show(props: T) {
    queue.push({
      props,
      promise: new Promise(async (resolver, reject) => {
        if (
          !internalRef.current ||
          typeof internalRef.current.show !== 'function'
        ) {
          return reject(
            '[react-native-global-components] can not find context make sure rendering Provider',
          );
        }

        if (shouldWaitForUserInteraction) {
          await Promise.allSettled(queue.map((item) => item.promise));
        }

        internalRef.current.show(props, resolver);
      }),
    });

    return await Promise.allSettled(queue.map((item) => item.promise));
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
