import React from 'react';
import { PanGestureHandlerProps } from 'react-native-gesture-handler';

export type BottomSheetContextType = {
  show: () => void;
  hide: () => void;
  panHandlerProps: PanGestureHandlerProps;
};

const BottomSheetContext = React.createContext<BottomSheetContextType | null>(
  null,
);

export default BottomSheetContext;
