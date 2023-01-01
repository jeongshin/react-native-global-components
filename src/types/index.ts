import { WithTimingConfig } from 'react-native-reanimated';

export interface OverlayProps extends AnimationProps {
  /**
   * flag to hide global component when overlay pressed
   * default: false
   */
  hideOnPressOverlay?: boolean;

  /**
   * flag to hide global component when android hardware back pressed
   * default: true
   * @see https://reactnative.dev/docs/backhandler
   */
  enableBackPressHandler?: boolean;

  /**
   * max opacity of overlay
   * default: 0.5
   */
  opacity?: number;

  /**
   * hex color of overlay
   * default: #000000
   */
  overlayColor?: string;
}

export interface AnimationProps {
  /**
   * animation used to overlay
   */
  animationWithTimingConfig?: WithTimingConfig;
}

export interface PortalProps {
  name: string;
}

/**
 * context to update global component state
 *
 */
export interface UpdateStateProps {
  /**
   * hide component with animation if registered
   * use `addHideAnimation` to register animation that should be run
   * before hide.
   * @returns {Promise<void>}
   */
  hide: () => Promise<void>;
  /**
   * add animation to be completed before component is hidden
   * registered animation run parallel using `Promise.all`
   *
   * @param animation
   * @returns {void}
   */
  addHideAnimation: (animation: Animation) => void;
}

export type Animation = () => Promise<void>;

// export type GlobalComponentName = 'PopUp' | 'BottomSheet' | 'SnackBar';
