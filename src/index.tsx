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

type GlobalComponentsProps = {
  style?: ViewStyle;
  children?: React.ReactNode;
};

const ComponentName = 'GlobalComponentsView';

export const GlobalComponentsView =
  UIManager.getViewManagerConfig(ComponentName) !== null
    ? requireNativeComponent<GlobalComponentsProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
