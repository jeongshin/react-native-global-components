import React from 'react';
import { PanGestureHandlerProps } from 'react-native-gesture-handler';
export type BottomSheetContextType = {
    show: () => void;
    hide: () => void;
    panHandlerProps: PanGestureHandlerProps;
};
declare const BottomSheetContext: React.Context<BottomSheetContextType | null>;
export default BottomSheetContext;
//# sourceMappingURL=BottomSheetContext.d.ts.map