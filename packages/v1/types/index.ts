export interface PopupContext<T = any> {
  show: (props: T) => void;
  hide: () => Promise<void>;
}

export interface UsePopupContext {
  addHideAnimation: (anim: Animation) => void;
  hide: () => Promise<void>;
}

export type Animation = () => Promise<void>;
