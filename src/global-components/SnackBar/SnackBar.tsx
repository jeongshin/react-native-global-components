import React, { useRef } from 'react';
import { ViewStyle } from 'react-native';

import Animated, { AnimatedStyleProp } from 'react-native-reanimated';

const SnackBar: React.FC<SnackBarProps> = ({
  position = 'bottom',
  style,
  offsetY = 50,
  children,
}) => {
  const positionStyle = useRef<Record<string, ViewStyle>>({
    bottom: {
      position: 'absolute',
      bottom: offsetY,
      alignSelf: 'center',
    },
    top: {
      position: 'absolute',
      top: offsetY,
      alignSelf: 'center',
    },
  }).current;

  return (
    <Animated.View style={[style, positionStyle[position]]}>
      {children}
    </Animated.View>
  );
};

export interface SnackBarProps {
  // duration?: number;
  children?: React.ReactNode;
  duration?: number;
  position?: 'top' | 'bottom';
  offsetY?: number;
  style?: AnimatedStyleProp<ViewStyle>;
}

export default SnackBar;
