"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _BottomSheetContext = _interopRequireDefault(require("../context/BottomSheetContext"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const useBottomSheetContext = () => {
  const context = _react.default.useContext(_BottomSheetContext.default);
  if (!context) {
    throw new Error('[BottomSheetContext] useBottomSheetContext hook should be used in BottomSheetContext provider');
  }
  return context;
};
var _default = useBottomSheetContext;
exports.default = _default;
//# sourceMappingURL=useBottomSheetContext.js.map