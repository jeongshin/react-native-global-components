import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { filter, tap } from 'rxjs';
import { Animation, Props, UpdateStateProps } from '../../types';
import GlobalComponentManager from '../manager/GlobalComponentManager';

const useGlobalComponent = <S extends Props>(
  manager: GlobalComponentManager,
  name: string,
) => {
  const [visible, setVisible] = useState(false);

  const [state, setState] = useState<S | null>(null);

  const animations = useRef<Animation[]>([]);

  const hide = useCallback(async () => {
    await Promise.all(animations.current.map((fn) => fn()));
    setState(null);
    setVisible(false);
  }, []);

  const addHideAnimation = useCallback((animation: Animation) => {
    animations.current = [...animations.current, animation];
  }, []);

  const show = useCallback((props: S) => {
    animations.current = [];
    setState(props);
    setVisible(true);
  }, []);

  const updateState = useMemo<UpdateStateProps>(() => {
    return { hide, addHideAnimation };
  }, []);

  /**
   * subscribe remove command
   */
  useEffect(() => {
    const subscription = manager
      .observeRemove()
      .pipe(
        filter((s): s is { name: string; props: S } => s.name === name),
        tap(() => hide()),
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    state,
    show,
    setState,
    visible,
    setVisible,
    updateState,
  };
};

export default useGlobalComponent;
