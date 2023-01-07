import React, { useEffect, useRef } from 'react';
import { BackHandler, Platform } from 'react-native';
import useUpdateGlobalComponentState from './useUpdateGlobalComponentState';

const useHideOnAndroidBackPress = ({ enabled }: { enabled: boolean }) => {
  const { hide } = useUpdateGlobalComponentState();

  const platform = useRef(Platform.OS).current;

  useEffect(() => {
    if (platform !== 'android' || !enabled) return;
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        hide();
        return true;
      },
    );

    return () => subscription.remove();
  }, [enabled]);
};

export default useHideOnAndroidBackPress;
