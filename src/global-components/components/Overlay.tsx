import React, { useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated from 'react-native-reanimated';
import { OverlayProps } from '../../types';
import useFadeAnimationStyle from '../hooks/useFadeAnimationStyle';
import useUpdateGlobalComponentState from '../hooks/useUpdateGlobalComponentState';

/**
 * Dim overlay with fade animation.
 *
 * @example
 * ```tsx
 *
 * return (
 *   <Container>
 *     <Overlay {...overlayProps} />
 *   </Container>
 * );
 * ```
 *
 * @see {OverlayProps} see OverlayProps for props description.
 */
const Overlay: React.FC<OverlayProps> = ({
  hideOnPressOverlay = false,
  enableBackPressHandler = true,
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

  useEffect(() => {
    if (!enableBackPressHandler) return;
    // TODO(Jerry) add event listener
  }, []);

  return (
    <TouchableWithoutFeedback disabled={!hideOnPressOverlay} onPress={hide}>
      <Animated.View
        style={[
          style,
          StyleSheet.absoluteFill,
          { backgroundColor: overlayColor },
        ]}
      />
    </TouchableWithoutFeedback>
  );
};

export default Overlay;
