import React, { useEffect } from 'react';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';
import { DEFAULT_WITH_TIMING_CONFIG } from '../constant';
import useUpdateGlobalComponentState from './useUpdateGlobalComponentState';

const useSlideAnimationStyle = ({
  animationConfig = DEFAULT_WITH_TIMING_CONFIG,
  slideY = 30,
}: {
  animationConfig?: WithTimingConfig;
  slideY?: number;
}) => {
  const translateY = useSharedValue(slideY);

  const { addHideAnimation } = useUpdateGlobalComponentState();

  const style = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));

  useEffect(() => {
    translateY.value = withTiming(0, animationConfig);

    addHideAnimation(() => {
      return new Promise((resolve) => {
        translateY.value = withTiming(slideY, animationConfig, () =>
          runOnJS(resolve)(),
        );
      });
    });
  }, []);

  return {
    style,
  };
};

export default useSlideAnimationStyle;
