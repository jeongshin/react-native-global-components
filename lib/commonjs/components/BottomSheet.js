"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _constants = require("../constants");
var _BottomSheetContext = _interopRequireDefault(require("../context/BottomSheetContext"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const BottomSheet = (_ref, ref) => {
  let {
    children,
    animationConfig = _constants.DEFAULT_ANIM_CONFIG,
    backdropStyle = _constants.DEFAULT_BACKDROP_STYLE,
    containerStyle = _constants.DEFAULT_CONTAINER_STYLE,
    resetAnimationConfig = _constants.DEFAULT_SPRING_ANIM_CONFIG,
    shouldHideOnBackdropPress = true,
    onHidden,
    onShown,
    shouldHideOnPanEnd,
    maxContentHeight,
    panGestureHandlerProps
  } = _ref;
  const [visible, setVisible] = (0, _react.useState)(false);
  const {
    height: deviceHeight
  } = (0, _reactNative.useWindowDimensions)();
  const [layoutHeight, setLayoutHeight] = (0, _react.useState)(0);
  const y = (0, _reactNativeReanimated.useSharedValue)(0);
  const dimOpacity = (0, _reactNativeReanimated.useSharedValue)(0);
  const maxDimOpacity = backdropStyle.opacity ?? 1;
  const height = maxContentHeight ? Math.min(maxContentHeight, layoutHeight, deviceHeight) : Math.min(layoutHeight, deviceHeight);
  const animateShow = (0, _react.useCallback)(contentHeight => {
    y.value = contentHeight;
    y.value = (0, _reactNativeReanimated.withTiming)(0, animationConfig, () => {
      if (!onShown) return;
      (0, _reactNativeReanimated.runOnJS)(onShown)();
    });
    dimOpacity.value = (0, _reactNativeReanimated.withTiming)(maxDimOpacity, animationConfig);
  }, [animationConfig, maxDimOpacity, onShown]);
  const animateReset = (0, _react.useCallback)(() => {
    y.value = (0, _reactNativeReanimated.withSpring)(0, resetAnimationConfig);
    dimOpacity.value = (0, _reactNativeReanimated.withTiming)(maxDimOpacity, animationConfig);
  }, [resetAnimationConfig, animationConfig, maxDimOpacity]);
  const animateHide = (0, _react.useCallback)(cb => {
    dimOpacity.value = (0, _reactNativeReanimated.withTiming)(0, animationConfig);
    y.value = (0, _reactNativeReanimated.withTiming)(height, animationConfig, () => (0, _reactNativeReanimated.runOnJS)(cb)());
  }, [height, animationConfig]);
  const hide = (0, _react.useCallback)(() => {
    animateHide(() => {
      setVisible(false);
      onHidden && onHidden();
    });
  }, [animateHide]);
  const handleGestureEnd = (0, _react.useCallback)(event => {
    if (shouldHideOnPanEnd && shouldHideOnPanEnd(event)) {
      return hide();
    }
    animateReset();
  }, [hide, animateReset, shouldHideOnPanEnd]);
  const onGestureEvent = (0, _reactNativeReanimated.useAnimatedGestureHandler)({
    // onStart: (event) => {
    //   //
    // },
    onActive: event => {
      if (event.translationY < -10) return;
      y.value = event.translationY;
      dimOpacity.value = maxDimOpacity - Math.abs(maxDimOpacity * (event.translationY / height));
    },
    onEnd: event => (0, _reactNativeReanimated.runOnJS)(handleGestureEnd)(event)
  }, [maxDimOpacity, hide, handleGestureEnd]);
  const show = (0, _react.useCallback)(() => {
    setVisible(true);
  }, []);
  const handleLayout = (0, _react.useCallback)(event => {
    if (!visible) return;
    const _layoutHeight = event.nativeEvent.layout.height;
    setLayoutHeight(_layoutHeight);
    animateShow(_layoutHeight);
  }, [visible, animateShow]);
  const animatedBottomSheetStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    transform: [{
      translateY: y.value
    }]
  }));
  const animatedDimStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: dimOpacity.value
  }));
  const bottomSheetContextValue = (0, _react.useMemo)(() => {
    return {
      show,
      hide,
      panHandlerProps: {
        ...panGestureHandlerProps,
        onGestureEvent
      }
    };
  }, [show, hide, onGestureEvent]);
  (0, _react.useImperativeHandle)(ref, () => ({
    show,
    hide
  }), [show, hide]);
  if (!visible) return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: _reactNative.StyleSheet.absoluteFill
  }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableWithoutFeedback, {
    disabled: !shouldHideOnBackdropPress,
    onPress: hide
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [styles.dimBase, _reactNative.StyleSheet.absoluteFill, animatedDimStyle]
  })), /*#__PURE__*/_react.default.createElement(_BottomSheetContext.default.Provider, {
    value: bottomSheetContextValue
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    onLayout: handleLayout,
    style: [styles.bottomSheetContainer, animatedBottomSheetStyle, containerStyle, {
      opacity: height === 0 ? 0 : 1
    }]
  }, children)));
};
const styles = _reactNative.StyleSheet.create({
  dimBase: {
    backgroundColor: '#000000',
    width: '100%',
    height: '100%'
  },
  bottomSheetContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0
  }
});
var _default = /*#__PURE__*/_react.default.forwardRef(BottomSheet);
exports.default = _default;
//# sourceMappingURL=BottomSheet.js.map