import React, {
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import { ExternalPopupContext } from '../context';
import { PopupContext, Animation } from '../types';

interface ProviderProps<T> {
  Component: React.FC<T>;
  internalRef: React.RefObject<PopupContext<T>>;
}

function Provider<T>({ Component, internalRef }: ProviderProps<T>) {
  const prevRef = useRef(internalRef.current);

  const [props, setProps] = useState<T | null>(null);

  const animations = useRef<Animation[]>([]);

  const context = useMemo(
    () => ({
      show: (p: T) => setProps(p),
      hide: async () => {
        await Promise.all(animations.current.map((fn) => fn()));
        setProps(null);
      },
      addHideAnimation: (a: Animation) => {
        animations.current.push(a);
      },
    }),
    [],
  );

  useImperativeHandle(internalRef, () => context, []);

  useEffect(() => {
    return () => {
      //@ts-ignore
      internalRef.current = prevRef.current;
    };
  }, []);

  if (!props) return null;

  return (
    <ExternalPopupContext.Provider value={context}>
      <Component {...props} />
    </ExternalPopupContext.Provider>
  );
}

export default Provider;
