import { useEffect, useRef } from 'react';
import { BackHandler, Platform } from 'react-native';
import { usePopupContext } from '../context';

/**
 * use global component action on android hardware back press event
 * @param {boolean} p.enabled if true hide current global component else nothing happens
 */
const useHideOnAndroidBackPress = ({ enabled }: { enabled: boolean }) => {
  const { hide } = usePopupContext();

  const platform = useRef(Platform.OS).current;

  useEffect(() => {
    if (platform !== 'android') return;
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        enabled && hide();
        return true;
      },
    );

    return () => subscription.remove();
  }, [enabled]);
};

export default useHideOnAndroidBackPress;
