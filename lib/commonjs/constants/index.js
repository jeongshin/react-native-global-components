"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_SPRING_ANIM_CONFIG = exports.DEFAULT_CONTAINER_STYLE = exports.DEFAULT_BACKDROP_STYLE = exports.DEFAULT_ANIM_CONFIG = void 0;
var _reactNativeReanimated = require("react-native-reanimated");
const DEFAULT_ANIM_CONFIG = {
  duration: 300,
  easing: _reactNativeReanimated.Easing.bezier(0.25, 0.1, 0.25, 1)
};
exports.DEFAULT_ANIM_CONFIG = DEFAULT_ANIM_CONFIG;
const DEFAULT_BACKDROP_STYLE = {
  backgroundColor: '#000000',
  opacity: 0.5
};
exports.DEFAULT_BACKDROP_STYLE = DEFAULT_BACKDROP_STYLE;
const DEFAULT_CONTAINER_STYLE = {
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  overflow: 'hidden'
};
exports.DEFAULT_CONTAINER_STYLE = DEFAULT_CONTAINER_STYLE;
const DEFAULT_SPRING_ANIM_CONFIG = {
  stiffness: 50,
  mass: 0.7
};
exports.DEFAULT_SPRING_ANIM_CONFIG = DEFAULT_SPRING_ANIM_CONFIG;
//# sourceMappingURL=index.js.map