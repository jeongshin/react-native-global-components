import React, { useImperativeHandle, useMemo, useRef, useState } from 'react';
import { ExternalPopupContext } from '../context';
import { PopupContext, Animation } from '../types';

interface ProviderProps<T> {
  Component: React.FC<T>;
  internalRef: React.RefObject<PopupContext<T>>;
}

function Provider<T>({ Component, internalRef }: ProviderProps<T>) {
  const [props, setProps] = useState<T | null>(null);

  const resolverRef = useRef<(() => void) | null>(null);

  const animations = useRef<Animation[]>([]);

  const hideAnimation = async () => {
    await Promise.all(animations.current.map((fn) => fn()));
    animations.current = [];
    setProps(null);
  };

  const hide = async () => {
    await hideAnimation();
    resolverRef.current && resolverRef.current();
    resolverRef.current = null;
  };

  const methods = useMemo(
    () => ({
      show: async (p: T, resolver: () => void) => {
        await hideAnimation();

        requestAnimationFrame(() => {
          setProps(p);
          resolverRef.current = resolver;
        });
      },
      hide,
      addHideAnimation: (a: Animation) => {
        animations.current.push(a);
      },
    }),
    [],
  );

  useImperativeHandle(internalRef, () => methods, []);

  if (!props) return null;

  return (
    <ExternalPopupContext.Provider value={methods}>
      <Component {...props} />
    </ExternalPopupContext.Provider>
  );
}

export default Provider;
