import React from 'react';

import { PanGestureHandler } from 'react-native-gesture-handler';

import Animated from 'react-native-reanimated';

import useBottomSheetContext from '../../context/useBottomSheetContext';

const BottomSheetPanHandlerWrapper: React.FC<
  BottomSheetPanHandlerWrapperProps
> = ({ children }) => {
  const { panHandlerProps } = useBottomSheetContext();

  return (
    <PanGestureHandler {...panHandlerProps}>
      <Animated.View>{children}</Animated.View>
    </PanGestureHandler>
  );
};

type BottomSheetPanHandlerWrapperProps = {
  children?: React.ReactElement;
};

export default BottomSheetPanHandlerWrapper;
