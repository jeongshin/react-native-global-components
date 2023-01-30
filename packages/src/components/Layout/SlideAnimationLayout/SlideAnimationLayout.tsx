import React, { useEffect, useRef } from 'react';
import { ViewStyle } from 'react-native';
import Animated, { AnimatedStyleProp } from 'react-native-reanimated';
import { timer } from 'rxjs';
import useUpdateGlobalComponentState from '../../../hooks/useUpdateGlobalComponentState';

export interface SlideAnimationLayoutProps {
  children?: React.ReactNode;
  duration?: number;
  position?: 'top' | 'bottom';
  offsetY?: number;
  style?: AnimatedStyleProp<ViewStyle>;
  testID?: string;
}

const SlideAnimationLayout: React.FC<SlideAnimationLayoutProps> = ({
  position = 'bottom',
  style,
  offsetY = 50,
  duration = 2000,
  children,
  testID,
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
    if (typeof duration !== 'number') return;

    const subscription = timer(duration).subscribe(hide);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Animated.View testID={testID} style={[style, positionStyle[position]]}>
      {children}
    </Animated.View>
  );
};

export default SlideAnimationLayout;
