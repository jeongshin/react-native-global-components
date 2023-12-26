import {
  Easing,
  ReduceMotion,
  WithTimingConfig,
} from 'react-native-reanimated';

export const DEFAULT_WITH_TIMING_CONFIG: WithTimingConfig = {
  duration: 300,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  reduceMotion: ReduceMotion.Never,
};
