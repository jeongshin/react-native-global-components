import React, { useEffect } from 'react';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';
import { DEFAULT_WITH_TIMING_CONFIG } from '../constant';
import useUpdateGlobalComponentState from '../core/hooks/useUpdateGlobalComponentState';

const useSlideAnimationStyle = ({
  animationConfig = DEFAULT_WITH_TIMING_CONFIG,
  translateY = 30,
}: {
  animationConfig?: WithTimingConfig;
  translateY?: number;
}) => {
  const animation = useSharedValue(translateY);

  const { addHideAnimation } = useUpdateGlobalComponentState();

  const style = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: animation.value,
        },
      ],
    }),
    [],
  );

  useEffect(() => {
    console.log('TranslateY', translateY);
    animation.value = withTiming(0, animationConfig);

    addHideAnimation(() => {
      return new Promise((resolve) => {
        animation.value = withTiming(translateY, animationConfig, () =>
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
