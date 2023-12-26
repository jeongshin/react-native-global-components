import { useEffect } from 'react';

import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';

import { DEFAULT_WITH_TIMING_CONFIG } from '../constant';

import { usePopupContext } from '../context';

export interface FadeAnimationConfigs {
  minOpacity?: number;
  maxOpacity?: number;
  animationConfig?: WithTimingConfig;
}

const useFadeAnimationStyle = ({
  minOpacity = 0,
  maxOpacity = 1,
  animationConfig = DEFAULT_WITH_TIMING_CONFIG,
}: FadeAnimationConfigs = {}) => {
  const opacity = useSharedValue(minOpacity);

  const { addHideAnimation } = usePopupContext();

  const style = useAnimatedStyle(
    () => ({
      opacity: opacity.value,
    }),
    [],
  );

  useEffect(() => {
    opacity.value = withTiming(maxOpacity, animationConfig);

    addHideAnimation(() => {
      return new Promise((resolve) => {
        opacity.value = withTiming(minOpacity, animationConfig, () =>
          runOnJS(resolve)(),
        );
      });
    });

    return () => {
      opacity.value = minOpacity;
    };
  }, []);

  return {
    style,
  };
};

export default useFadeAnimationStyle;
