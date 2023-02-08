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

export interface AnimationBaseConfig {
  onHidden?: () => void;
  onShown?: () => void;
}

export type AnyProps = Record<string, any>;
