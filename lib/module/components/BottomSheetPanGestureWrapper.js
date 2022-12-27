import React from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import useBottomSheetContext from '../hooks/useBottomSheetContext';
const BottomSheetPanHandlerWrapper = _ref => {
  let {
    children
  } = _ref;
  const {
    panHandlerProps
  } = useBottomSheetContext();
  return /*#__PURE__*/React.createElement(PanGestureHandler, panHandlerProps, /*#__PURE__*/React.createElement(Animated.View, null, children));
};
export default BottomSheetPanHandlerWrapper;
//# sourceMappingURL=BottomSheetPanGestureWrapper.js.map