import React, {
  useState,
  useImperativeHandle,
  useCallback,
  useMemo,
} from 'react';

import {
  LayoutChangeEvent,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';

import {
  PanGestureHandlerGestureEvent,
  GestureEventPayload,
  PanGestureHandlerEventPayload,
  PanGestureHandlerProps,
} from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  runOnJS,
  WithTimingConfig,
  WithSpringConfig,
} from 'react-native-reanimated';

import {
  DEFAULT_BACKDROP_STYLE,
  DEFAULT_ANIM_CONFIG,
  DEFAULT_CONTAINER_STYLE,
  DEFAULT_SPRING_ANIM_CONFIG,
} from '../constants';

import BottomSheetContext, {
  BottomSheetContextType,
} from '../context/BottomSheetContext';

const BottomSheet = (
  {
    children,
    animationConfig = DEFAULT_ANIM_CONFIG,
    backdropStyle = DEFAULT_BACKDROP_STYLE,
    containerStyle = DEFAULT_CONTAINER_STYLE,
    resetAnimationConfig = DEFAULT_SPRING_ANIM_CONFIG,
    hideOnDimPress = true,
    onDismissed,
    shouldHideOnPanEnd,
    maxContentHeight,
    panGestureHandlerProps,
  }: BottomSheetProps,
  ref: React.ForwardedRef<BottomSheetRef>,
) => {
  const [visible, setVisible] = useState(false);

  const { height: deviceHeight } = useWindowDimensions();

  const [layoutHeight, setLayoutHeight] = useState(0);

  const y = useSharedValue(0);

  const dimOpacity = useSharedValue(0);

  const maxDimOpacity = backdropStyle.opacity ?? 1;

  const height = maxContentHeight
    ? maxContentHeight
    : Math.min(layoutHeight, deviceHeight);

  const animateShow = useCallback(
    (contentHeight: number) => {
      y.value = contentHeight;
      y.value = withTiming(0, animationConfig);
      dimOpacity.value = withTiming(maxDimOpacity, animationConfig);
    },
    [animationConfig, maxDimOpacity],
  );

  const animateReset = useCallback(() => {
    y.value = withSpring(0, resetAnimationConfig);
    dimOpacity.value = withTiming(maxDimOpacity, animationConfig);
  }, [resetAnimationConfig, animationConfig, maxDimOpacity]);

  const animateHide = useCallback(
    (cb: () => void) => {
      dimOpacity.value = withTiming(0, animationConfig);

      y.value = withTiming(height, animationConfig, () => runOnJS(cb)());
    },
    [height, animationConfig],
  );

  const hide = useCallback(() => {
    animateHide(() => {
      setVisible(false);
      onDismissed && onDismissed();
    });
  }, [animateHide]);

  const handleGestureEnd = useCallback(
    (event: Readonly<GestureEventPayload & PanGestureHandlerEventPayload>) => {
      if (shouldHideOnPanEnd && shouldHideOnPanEnd(event)) {
        return hide();
      }
      animateReset();
    },
    [hide, animateReset, shouldHideOnPanEnd],
  );

  const onGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>(
      {
        // onStart: (event) => {
        //   //
        // },
        onActive: (event) => {
          if (event.translationY < -10) return;

          y.value = event.translationY;

          dimOpacity.value =
            maxDimOpacity -
            Math.abs(maxDimOpacity * (event.translationY / height));
        },
        onEnd: (event) => runOnJS(handleGestureEnd)(event),
      },
      [maxDimOpacity, hide, handleGestureEnd],
    );

  const show = useCallback(() => {
    setVisible(true);
  }, []);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (!visible) return;
      const _layoutHeight = event.nativeEvent.layout.height;
      setLayoutHeight(_layoutHeight);
      animateShow(_layoutHeight);
    },
    [visible, animateShow],
  );

  const animatedBottomSheetStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: y.value,
      },
    ],
  }));

  const animatedDimStyle = useAnimatedStyle(() => ({
    opacity: dimOpacity.value,
  }));

  const bottomSheetContextValue = useMemo<BottomSheetContextType>(() => {
    return {
      show,
      hide,
      panHandlerProps: { ...panGestureHandlerProps, onGestureEvent },
    };
  }, [show, hide, onGestureEvent]);

  useImperativeHandle(ref, () => ({ show, hide }), [show, hide]);

  if (!visible) return <></>;

  return (
    <View style={StyleSheet.absoluteFill}>
      <TouchableWithoutFeedback disabled={!hideOnDimPress} onPress={hide}>
        <Animated.View
          style={[styles.dimBase, StyleSheet.absoluteFill, animatedDimStyle]}
        />
      </TouchableWithoutFeedback>

      <BottomSheetContext.Provider value={bottomSheetContextValue}>
        <Animated.View
          onLayout={handleLayout}
          style={[
            styles.bottomSheetContainer,
            animatedBottomSheetStyle,
            containerStyle,
            { opacity: height === 0 ? 0 : 1 },
          ]}>
          {children}
        </Animated.View>
      </BottomSheetContext.Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  dimBase: {
    backgroundColor: '#000000',
    width: '100%',
    height: '100%',
  },
  bottomSheetContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});

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
  hideOnDimPress?: boolean;

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
  shouldHideOnPanEnd?: (
    event: Readonly<GestureEventPayload & PanGestureHandlerEventPayload>,
  ) => boolean;

  /**
   * callback on bottom sheet dismissed
   */
  onDismissed?: () => void;
};

export type BottomSheetRef = {
  show: () => void;
  hide: () => void;
};

export default React.forwardRef(BottomSheet);
