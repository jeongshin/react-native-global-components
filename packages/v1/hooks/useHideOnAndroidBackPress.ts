import { useEffect, useRef } from 'react';
import { BackHandler, Platform } from 'react-native';
import { usePopupContext } from '../context';

interface Params {
  enabled?: boolean;
  backHandler?: () => void;
}
/**
 * use global component action on android hardware back press event
 * @param {boolean} p.enabled if true hide current global component else nothing happens
 */
const useHideOnAndroidBackPress = ({ enabled = true, backHandler }: Params) => {
  const { hide } = usePopupContext();

  const platform = useRef(Platform.OS).current;

  useEffect(() => {
    if (platform !== 'android') return;

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        enabled && hide();
        backHandler && backHandler();
        return true;
      },
    );

    return () => subscription.remove();
  }, [enabled]);
};

export default useHideOnAndroidBackPress;
