import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated from 'react-native-reanimated';
import { WithTimingConfig } from 'react-native-reanimated';
import useUpdateGlobalComponentState from '../../../core/hooks/useUpdateGlobalComponentState';
import useFadeAnimationStyle from '../../../hooks/useFadeAnimationStyle';

export interface FullScreenOverlayProps {
  /**
   * flag to hide global component when overlay pressed
   * default: false
   */
  hideOnPressOverlay?: boolean;

  /**
   * max opacity of overlay
   * default: 0.5
   */
  maxOpacity?: number;

  /**
   * min opacity of overlay
   * default: 0
   */
  minOpacity?: number;

  /**
   * hex color of overlay
   * default: #000000
   */
  overlayColor?: string;

  /**
   * animation used to overlay
   */
  animationConfig?: WithTimingConfig;
}

/**
 * Dim overlay with fade animation.
 */
const FullScreenOverlay: React.FC<FullScreenOverlayProps> = ({
  hideOnPressOverlay = false,
  maxOpacity = 0.5,
  minOpacity,
  overlayColor = '#000000',
  animationConfig,
}) => {
  const { style } = useFadeAnimationStyle({
    maxOpacity,
    minOpacity,
    animationConfig,
  });

  const { hide } = useUpdateGlobalComponentState();

  return (
    <TouchableWithoutFeedback disabled={!hideOnPressOverlay} onPress={hide}>
      <Animated.View
        style={[
          style,
          StyleSheet.flatten([
            StyleSheet.absoluteFillObject,
            { backgroundColor: overlayColor },
          ]),
        ]}
      />
    </TouchableWithoutFeedback>
  );
};

export default FullScreenOverlay;
