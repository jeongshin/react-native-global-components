export * from './types';
export * from './global-components/components';

export { default as useUpdateGlobalComponentState } from './global-components/hooks/useUpdateGlobalComponentState';
export { default as useGlobalComponentState } from './global-components/hooks/useGlobalComponentState';

export { default as createPopup } from './global-components/Popup';
export { default as createSnackbar } from './global-components/Snackbar';

export { default as useFadeAnimationStyle } from './global-components/hooks/useFadeAnimationStyle';
export { default as useSlideAnimationStyle } from './global-components/hooks/useSlideAnimationStyle';

export {
  default as Snackbar,
  SnackbarProps,
} from './global-components/Snackbar/Snackbar';
