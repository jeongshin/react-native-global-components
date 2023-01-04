// export {
//   default as BottomSheet,
//   BottomSheetProps,
//   BottomSheetRef,
// } from './components/BottomSheet/BottomSheet';

// export { default as BottomSheetPanGestureWrapper } from './components/BottomSheet/BottomSheetPanGestureWrapper';

// export { default as useBottomSheetContext } from './context/useBottomSheetContext';

export * from './types';

export * from './global-components/components';

export { default as useUpdateGlobalComponentState } from './global-components/hooks/useUpdateGlobalComponentState';
export { default as useGlobalComponentState } from './global-components/hooks/useGlobalComponentState';

export { default as createPopUp } from './global-components/PopUp';
export { default as createSnackBar } from './global-components/SnackBar';

export { default as useFadeAnimationStyle } from './global-components/hooks/useFadeAnimationStyle';
export { default as useSlideAnimationStyle } from './global-components/hooks/useSlideAnimationStyle';

export {
  default as SnackBar,
  SnackBarProps,
} from './global-components/SnackBar/SnackBar';
