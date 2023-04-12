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

export interface SlideAnimationConfig {
  animationConfig?: WithTimingConfig;
  translateY?: number;
}

const useSlideAnimationStyle = ({
  animationConfig = DEFAULT_WITH_TIMING_CONFIG,
  translateY = 30,
}: SlideAnimationConfig) => {
  const animation = useSharedValue(translateY);

  const { addHideAnimation } = usePopupContext();

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
    animation.value = withTiming(0, animationConfig);

    addHideAnimation(() => {
      return new Promise<void>((resolve) => {
        const callback = () => {
          resolve();
        };

        animation.value = withTiming(translateY, animationConfig, () =>
          runOnJS(callback)(),
        );
      });
    });

    return () => {
      animation.value = translateY;
    };
  }, []);

  return { style };
};

export default useSlideAnimationStyle;
