import React from 'react';
import { ViewStyle } from 'react-native';
import { GestureEventPayload, PanGestureHandlerEventPayload, PanGestureHandlerProps } from 'react-native-gesture-handler';
import { WithTimingConfig, WithSpringConfig } from 'react-native-reanimated';
export type BottomSheetProps = {
    /**
     * react children
     */
    children?: React.ReactElement;
    /**
     * maximum value of content height
     */
    maxContentHeight?: number;
    /**
     * animation config to show & hide bottom sheet
     */
    animationConfig?: WithTimingConfig;
    /**
     * animation config when released on pan gesture end
     */
    resetAnimationConfig?: WithSpringConfig;
    /**
     * custom backdrop style
     * use display: 'none' or opacity 0 to hide backdrop
     */
    backdropStyle?: ViewStyle;
    /**
     * flag to hide bottom sheet on dim
     */
    shouldHideOnBackdropPress?: boolean;
    /**
     * style of bottom sheet container
     */
    containerStyle?: ViewStyle;
    /**
     * pan gesture handler props
     */
    panGestureHandlerProps?: PanGestureHandlerProps;
    /**
     * custom logic to determine whether
     * bottom sheet should be closed or reset to original position.
     * if true, close bottom sheet with animation.
     * else reset to original position with spring animation
     *
     * use `resetAnimationConfig` to customize animation
     */
    shouldHideOnPanEnd?: (event: Readonly<GestureEventPayload & PanGestureHandlerEventPayload>) => boolean;
    /**
     * callback on bottom sheet dismissed
     */
    onHidden?: () => void;
    /**
     * callback on bottom sheet shown
     */
    onShown?: () => void;
};
export type BottomSheetRef = {
    show: () => void;
    hide: () => void;
};
declare const _default: React.ForwardRefExoticComponent<BottomSheetProps & React.RefAttributes<BottomSheetRef>>;
export default _default;
//# sourceMappingURL=BottomSheet.d.ts.map