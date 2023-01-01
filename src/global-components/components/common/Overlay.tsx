import React, { useCallback, useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { DEFAULT_WITH_TIMING_CONFIG } from '../../../global-components/constant';
import { OverlayProps, UpdateStateProps } from '../../../types';

interface IOverlayProps extends OverlayProps, UpdateStateProps {
  //
}

/**
 *
 * @param param0
 * @returns
 */
const Overlay: React.FC<IOverlayProps> = ({
  hideOnPressOverlay = false,
  enableBackPressHandler = true,
  opacity = 0.5,
  overlayColor = '#000000',
  animationWithTimingConfig: animationConfig = DEFAULT_WITH_TIMING_CONFIG,
  addHideAnimation,
  hide,
}) => {
  const overlayOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  useEffect(() => {
    overlayOpacity.value = withTiming(opacity, animationConfig);

    addHideAnimation(() => {
      return new Promise((resolve) => {
        withTiming(0, animationConfig, () => runOnJS(resolve)());
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
