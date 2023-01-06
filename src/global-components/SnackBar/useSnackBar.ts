import React, { useEffect } from 'react';
import { filter, of, switchMap, tap } from 'rxjs';
import useGlobalComponent from '../hooks/useGlobalComponent';
import { SnackbarProps } from './Snackbar';
import SnackbarManager from './SnackbarManager';

const useSnackbar = <S extends SnackbarProps>(name: string) => {
  const { show, visible, state, updateState, hideImmediate } =
    useGlobalComponent<S>(SnackbarManager, name);

  useEffect(() => {
    const subscription = SnackbarManager.observeRender()
      .pipe(
        filter((v): v is { name: string; props: S } => v.name === name),
        switchMap((v) => of(v.props).pipe(tap(hideImmediate), tap(show))),
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    state,
    visible,
    updateState,
  };
};

export default useSnackbar;
