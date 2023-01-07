import React, { useEffect, useRef } from 'react';
import { ViewStyle } from 'react-native';
import Animated, { AnimatedStyleProp } from 'react-native-reanimated';
import { timer } from 'rxjs';
import useUpdateGlobalComponentState from '../hooks/useUpdateGlobalComponentState';

export interface SnackbarProps {
  // duration?: number;
  children?: React.ReactNode;
  duration?: number;
  position?: 'top' | 'bottom';
  offsetY?: number;
  style?: AnimatedStyleProp<ViewStyle>;
}

const Snackbar: React.FC<SnackbarProps> = ({
  position = 'bottom',
  style,
  offsetY = 50,
  duration = 3000,
  children,
}) => {
  const { hide } = useUpdateGlobalComponentState();

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

  useEffect(() => {
    const subscription = timer(duration).subscribe(hide);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Animated.View style={[style, positionStyle[position]]}>
      {children}
    </Animated.View>
  );
};

export default Snackbar;
