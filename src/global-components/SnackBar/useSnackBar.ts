import React, { useEffect } from 'react';
import { filter, of, switchMap, tap } from 'rxjs';
import useGlobalComponent from '../hooks/useGlobalComponent';
import { SnackBarProps } from './SnackBar';
import SnackBarManager from './SnackBarManager';

const useSnackBar = <S extends SnackBarProps>(name: string) => {
  const { show, visible, state, updateState } = useGlobalComponent<S>(
    SnackBarManager,
    name,
  );

  useEffect(() => {
    const subscription = SnackBarManager.observeRender()
      .pipe(
        filter((v): v is { name: string; props: S } => v.name === name),
        switchMap((v) => of(v.props).pipe(tap(show))),
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

export default useSnackBar;
