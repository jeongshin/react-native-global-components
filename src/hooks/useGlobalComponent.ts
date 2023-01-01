import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { filter, tap } from 'rxjs';
import GlobalComponentManager from '../global-components/manager/GlobalComponentManager';
import { Animation, UpdateStateProps } from '@/types';

const useGlobalComponent = <S>(
  manager: GlobalComponentManager,
  name: string,
) => {
  const firstRendered = useRef(false);

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
   * subscribe render command
   */
  useEffect(() => {
    const subscription = manager
      .observeRender()
      .pipe(
        filter((s): s is { name: string; props: S } => s.name === name),
        tap((s) => show(s.props)),
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
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

  /**
   * notify manager component unmounted
   */
  useEffect(() => {
    if (!firstRendered.current) {
      firstRendered.current = true;
      return;
    }

    if (visible) return;

    manager.complete();
  }, [visible]);

  return {
    state,
    setState,
    visible,
    setVisible,
    updateState,
  };
};

export default useGlobalComponent;
