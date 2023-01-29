import React, { useEffect, useRef } from 'react';
import { filter, tap } from 'rxjs';
import PopupManager from './PopupManager';
import useGlobalComponent from '../hooks/useGlobalComponent';
import { AnyProps } from '../types';

const usePopup = <S extends AnyProps>(name: string) => {
  const firstRendered = useRef(false);

  const { show, state, visible, updateState } = useGlobalComponent(
    PopupManager,
    name,
  );

  useEffect(() => {
    const subscription = PopupManager.observeRender()
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
   * notify manager component unmounted
   */
  useEffect(() => {
    if (!firstRendered.current) {
      firstRendered.current = true;
      return;
    }

    if (visible) return;

    PopupManager.complete();
  }, [visible]);

  return {
    state,
    visible,
    updateState,
  };
};

export default usePopup;
