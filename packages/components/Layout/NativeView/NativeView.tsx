import type { ReactNode } from 'react';

import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-global-components' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

export interface NativeViewProps {
  style?: ViewStyle;
  children: ReactNode;
}

const NativeView = 'GlobalComponentsView';

export default UIManager.getViewManagerConfig(NativeView)
  ? requireNativeComponent<NativeViewProps>(NativeView)
  : () => {
      throw new Error(LINKING_ERROR);
    };
