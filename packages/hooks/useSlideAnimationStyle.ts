import { useEffect } from 'react';
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  WithTimingConfig,
} from 'react-native-reanimated';
import { DEFAULT_WITH_TIMING_CONFIG } from '../constant';
import useUpdateGlobalComponentState from '../core/hooks/useUpdateGlobalComponentState';
import type { AnimationBaseConfig } from '../types';

export interface SlideAnimationConfig {
  animationConfig?: WithTimingConfig;
  translateY?: number;
}

const useSlideAnimationStyle = ({
  animationConfig = DEFAULT_WITH_TIMING_CONFIG,
  translateY = 30,
  onHidden,
  onShown,
}: SlideAnimationConfig & AnimationBaseConfig) => {
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
    []
  );

  useEffect(() => {
    animation.value = withTiming(0, animationConfig, () => {
      if (!onShown) return;
      runOnJS(onShown)();
    });

    addHideAnimation(() => {
      return new Promise((resolve) => {
        const callback = () => {
          resolve();
          if (!onHidden) return;
          onHidden();
        };

        animation.value = withTiming(translateY, animationConfig, () =>
          runOnJS(callback)()
        );
      });
    });

    return () => {
      animation.value = translateY;
    };
  }, []);

  return {
    style,
  };
};

export default useSlideAnimationStyle;
