"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));
var _useBottomSheetContext = _interopRequireDefault(require("../hooks/useBottomSheetContext"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const BottomSheetPanHandlerWrapper = _ref => {
  let {
    children
  } = _ref;
  const {
    panHandlerProps
  } = (0, _useBottomSheetContext.default)();
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.PanGestureHandler, panHandlerProps, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, null, children));
};
var _default = BottomSheetPanHandlerWrapper;
exports.default = _default;
//# sourceMappingURL=BottomSheetPanGestureWrapper.js.map