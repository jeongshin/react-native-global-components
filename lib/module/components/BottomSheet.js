import React, {
  useState,
  useImperativeHandle,
  useCallback,
  useMemo,
} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {
  DEFAULT_BACKDROP_STYLE,
  DEFAULT_ANIM_CONFIG,
  DEFAULT_CONTAINER_STYLE,
  DEFAULT_SPRING_ANIM_CONFIG,
} from '../constants';
import BottomSheetContext from '../context/BottomSheetContext';
const BottomSheet = (_ref, ref) => {
  let {
    children,
    animationConfig = DEFAULT_ANIM_CONFIG,
    backdropStyle = DEFAULT_BACKDROP_STYLE,
    containerStyle = DEFAULT_CONTAINER_STYLE,
    resetAnimationConfig = DEFAULT_SPRING_ANIM_CONFIG,
    shouldHideOnBackdropPress = true,
    onHidden,
    onShown,
    shouldHideOnPanEnd,
    maxContentHeight,
    panGestureHandlerProps,
  } = _ref;
  const [visible, setVisible] = useState(false);
  const { height: deviceHeight } = useWindowDimensions();
  const [layoutHeight, setLayoutHeight] = useState(0);
  const y = useSharedValue(0);
  const dimOpacity = useSharedValue(0);
  const maxDimOpacity = backdropStyle.opacity ?? 1;
  const height = maxContentHeight
    ? Math.min(maxContentHeight, layoutHeight, deviceHeight)
    : Math.min(layoutHeight, deviceHeight);
  const animateShow = useCallback(
    (contentHeight) => {
      y.value = contentHeight;
      y.value = withTiming(0, animationConfig, () => {
        if (!onShown) return;
        runOnJS(onShown)();
      });
      dimOpacity.value = withTiming(maxDimOpacity, animationConfig);
    },
    [animationConfig, maxDimOpacity, onShown],
  );
  const animateReset = useCallback(() => {
    y.value = withSpring(0, resetAnimationConfig);
    dimOpacity.value = withTiming(maxDimOpacity, animationConfig);
  }, [resetAnimationConfig, animationConfig, maxDimOpacity]);
  const animateHide = useCallback(
    (cb) => {
      dimOpacity.value = withTiming(0, animationConfig);
      y.value = withTiming(height, animationConfig, () => runOnJS(cb)());
    },
    [height, animationConfig],
  );
  const hide = useCallback(() => {
    animateHide(() => {
      setVisible(false);
      onHidden && onHidden();
    });
  }, [animateHide]);
  const handleGestureEnd = useCallback(
    (event) => {
      if (shouldHideOnPanEnd && shouldHideOnPanEnd(event)) {
        return hide();
      }
      animateReset();
    },
    [hide, animateReset, shouldHideOnPanEnd],
  );
  const onGestureEvent = useAnimatedGestureHandler(
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
    (event) => {
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
  const bottomSheetContextValue = useMemo(() => {
    return {
      show,
      hide,
      panHandlerProps: {
        ...panGestureHandlerProps,
        onGestureEvent,
      },
    };
  }, [show, hide, onGestureEvent]);
  useImperativeHandle(
    ref,
    () => ({
      show,
      hide,
    }),
    [show, hide],
  );
  if (!visible) return /*#__PURE__*/ React.createElement(React.Fragment, null);
  return /*#__PURE__*/ React.createElement(
    View,
    {
      style: StyleSheet.absoluteFill,
    },
    /*#__PURE__*/ React.createElement(
      TouchableWithoutFeedback,
      {
        disabled: !shouldHideOnBackdropPress,
        onPress: hide,
      },
      /*#__PURE__*/ React.createElement(Animated.View, {
        style: [styles.dimBase, StyleSheet.absoluteFill, animatedDimStyle],
      }),
    ),
    /*#__PURE__*/ React.createElement(
      BottomSheetContext.Provider,
      {
        value: bottomSheetContextValue,
      },
      /*#__PURE__*/ React.createElement(
        Animated.View,
        {
          onLayout: handleLayout,
          style: [
            styles.bottomSheetContainer,
            animatedBottomSheetStyle,
            containerStyle,
            {
              opacity: height === 0 ? 0 : 1,
            },
          ],
        },
        children,
      ),
    ),
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
export default /*#__PURE__*/ React.forwardRef(BottomSheet);
//# sourceMappingURL=BottomSheet.js.map
