import React, { useEffect } from 'react';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { DEFAULT_WITH_TIMING_CONFIG } from '@/global-components/constant';
import { AnimationProps, UpdateStateProps } from '@/types';

interface FadeAnimationWrapperProps extends AnimationProps, UpdateStateProps {
  children?: React.ReactNode;
}

/**
 *
 * @param {React.ReactNode} p.children
 *
 * @returns
 */
const FadeAnimationWrapper: React.FC<FadeAnimationWrapperProps> = ({
  children,
  animationWithTimingConfig: animationConfig = DEFAULT_WITH_TIMING_CONFIG,
  addHideAnimation,
}) => {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    withTiming(1, animationConfig);

    addHideAnimation(() => {
      return new Promise((resolve) => {
        withTiming(0, animationConfig, () => runOnJS(resolve)());
      });
    });
  }, []);

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default FadeAnimationWrapper;
