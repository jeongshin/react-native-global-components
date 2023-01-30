export * from './types';
export * from './components/Layout';

/**
 * UIs
 */
export {
  default as AlertPopup,
  AlertPopupOption,
  AlertPopupProps,
} from './components/AlertPopup/AlertPopup';

/**
 * APIs
 */
export { default as createPopup } from './factory/popup';
export { default as createSnackbar } from './factory/snackbar';

/**
 * core hooks
 */
export { default as useUpdateGlobalComponentState } from './hooks/useUpdateGlobalComponentState';
export { default as useGlobalComponentState } from './hooks/useGlobalComponentState';

/**
 * animation hooks
 */
export { default as useFadeAnimationStyle } from './hooks/useFadeAnimationStyle';
export { default as useSlideAnimationStyle } from './hooks/useSlideAnimationStyle';
export { default as useHideOnAndroidBackPress } from './hooks/useHideOnAndroidBackPress';

/**
 * types
 */
export { FadeAnimationConfigs } from './hooks/useFadeAnimationStyle';
