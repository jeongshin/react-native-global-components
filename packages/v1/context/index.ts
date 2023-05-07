import { createContext, useContext } from 'react';
import { UsePopupContext } from '../types';

export const ExternalPopupContext = createContext<UsePopupContext | null>(null);

export function usePopupContext() {
  const context = useContext(ExternalPopupContext);

  if (!context) {
    throw new Error(
      '[react-native-global-components]  can not find context make sure rendering Provider',
    );
  }

  return context;
}

export const InternalPopupContext = createContext<number>(0);

export function usePopupId() {
  const context = useContext(InternalPopupContext);

  if (typeof context !== 'number') {
    throw new Error('[react-native-global-components]  can not find context');
  }

  return context;
}
