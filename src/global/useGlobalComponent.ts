import { useCallback } from 'react';
import GlobalBloc from './GlobalBloc';
import { GlobalComponentPropsList } from '@/types';

const useGlobalComponent = <
  T extends keyof GlobalComponentPropsList,
  P extends GlobalComponentPropsList[T],
>() => {
  /**
   * @prop {T} name name of component to render
   * @prop {P} props props of component to render
   */
  const show = useCallback((name: T, props: P) => {
    GlobalBloc.render({ name, props });
  }, []);

  /**
   *
   */
  const clear = useCallback(() => {
    GlobalBloc.clear();
  }, []);

  return {
    clear,
    show,
  };
};

export default useGlobalComponent;
