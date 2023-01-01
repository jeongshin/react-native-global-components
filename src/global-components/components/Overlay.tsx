import React, { useCallback, useEffect } from 'react';

import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { OverlayProps, UpdateStateProps } from '../../types';
import { DEFAULT_WITH_TIMING_CONFIG } from '../constant';

interface IOverlayProps extends OverlayProps, UpdateStateProps {
  //
}

/**
 * Dim overlay with fade animation.
 *
 * @example
 * ```tsx
 * const context = useUpdateGlobalComponentState();
 *
 * return (
 *   <Container>
 *     <Overlay {...context} {...overlayProps} />
 *   </Container>
 * );
 * ```
 *
 * @see {OverlayProps} see OverlayProps for props description.
 */
const Overlay: React.FC<IOverlayProps> = ({
  addHideAnimation,
  hide,
  hideOnPressOverlay = false,
  enableBackPressHandler = true,
  opacity = 0.5,
  overlayColor = '#000000',
  animationConfig: animationConfig = DEFAULT_WITH_TIMING_CONFIG,
}) => {
  const overlayOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  useEffect(() => {
    overlayOpacity.value = withTiming(opacity, animationConfig);

    addHideAnimation(() => {
      return new Promise((resolve) => {
        overlayOpacity.value = withTiming(0, animationConfig, () =>
          runOnJS(resolve)(),
        );
      });
    });
  }, []);

  useEffect(() => {
    if (!enableBackPressHandler) return;
    // TODO(Jerry) add event listener
  }, []);

  return (
    <TouchableWithoutFeedback disabled={!hideOnPressOverlay} onPress={hide}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: overlayColor },
          animatedStyle,
        ]}
      />
    </TouchableWithoutFeedback>
  );
};

export default Overlay;
