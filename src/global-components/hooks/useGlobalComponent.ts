import { useCallback } from 'react';
import GlobalComponentController from '../manager/GlobalComponentController';
import { GlobalComponentPropsList } from '@/types';

const useGlobalComponent = <
  T extends keyof GlobalComponentPropsList,
  P extends GlobalComponentPropsList[T],
>() => {
  /**
   * render component.
   * if screen in use push props and render later when screen is free
   *
   * @prop {T} name name of component to render
   * @prop {P} props props of component to render
   */
  const show = useCallback((name: T, props: P) => {
    GlobalComponentController.render({ name, props });
  }, []);

  /**
   * clear pending render list.
   *
   * @example
   * cancel all pending render list & render next immediately
   * ```ts
   * clear();
   * show('Component', {...props});
   * ````
   */
  const clear = useCallback(() => {
    GlobalComponentController.clear();
  }, []);

  return {
    clear,
    show,
  };
};

export default useGlobalComponent;
