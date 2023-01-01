import React, { useEffect } from 'react';

import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { AnimationProps, UpdateStateProps } from '../../types';
import { DEFAULT_WITH_TIMING_CONFIG } from '../constant';

interface FadeAnimationWrapperProps extends AnimationProps, UpdateStateProps {
  children?: React.ReactNode;
}

/**
 * Wrapper to use fade in/out animation rendering children components.
 *
 * @param {React.ReactNode} p.children
 * @param {WithTimingConfig} p.animationConfig
 *
 * @example
 *
 * ```tsx
 * const context = useUpdateGlobalComponentState();
 *
 * <FadeAnimationWrapper {...context}>
 *   <CustomUI />
 * </FadeAnimationWrapper>
 * ```
 */
const FadeAnimationWrapper: React.FC<FadeAnimationWrapperProps> = ({
  children,
  addHideAnimation,
  animationConfig = DEFAULT_WITH_TIMING_CONFIG,
}) => {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withTiming(1, animationConfig);

    addHideAnimation(() => {
      return new Promise((resolve) => {
        opacity.value = withTiming(0, animationConfig, () =>
          runOnJS(resolve)(),
        );
      });
    });
  }, []);

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default FadeAnimationWrapper;
