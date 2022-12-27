import { Easing } from 'react-native-reanimated';
export const DEFAULT_ANIM_CONFIG = {
  duration: 300,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1)
};
export const DEFAULT_BACKDROP_STYLE = {
  backgroundColor: '#000000',
  opacity: 0.5
};
export const DEFAULT_CONTAINER_STYLE = {
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  overflow: 'hidden'
};
export const DEFAULT_SPRING_ANIM_CONFIG = {
  stiffness: 50,
  mass: 0.7
};
//# sourceMappingURL=index.js.map