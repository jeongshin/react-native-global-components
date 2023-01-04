import React, { useEffect, useRef } from 'react';
import { filter, tap } from 'rxjs';
import { Props } from '../../types';
import useGlobalComponent from '../hooks/useGlobalComponent';
import PopUpManager from './PopUpManager';

const usePopUp = <S extends Props>(name: string) => {
  const firstRendered = useRef(false);

  const { show, state, visible, updateState } = useGlobalComponent(
    PopUpManager,
    name,
  );

  useEffect(() => {
    const subscription = PopUpManager.observeRender()
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

    PopUpManager.complete();
  }, [visible]);

  return {
    state,
    visible,
    updateState,
  };
};

export default usePopUp;
