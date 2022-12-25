import React from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import useBottomSheetContext from "../hooks/useBottomSheetContext";

const BottomSheetPanHandlerWrapper: React.FC<
  React.PropsWithChildren<Record<string, never>>
> = ({ children }) => {
  const { panHandlerProps } = useBottomSheetContext();

  return (
    <PanGestureHandler {...panHandlerProps}>
      <Animated.View>{children}</Animated.View>
    </PanGestureHandler>
  );
};

export default BottomSheetPanHandlerWrapper;
