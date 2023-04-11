import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import FullWindowOverlay from '../FullWindowOverlay/FullWindowOverlay';

export interface KeyboardAvoidingLayoutProps extends KeyboardAvoidingViewProps {
  bottomInset?: number;
  topInset?: number;
  windowOverlayEnabledIOS?: boolean;
  children?: React.ReactNode;
}

/**
 * Full screen container with keyboard avoiding view.
 */
const KeyboardAvoidingLayout: React.FC<KeyboardAvoidingLayoutProps> = ({
  children,
  bottomInset = 0,
  topInset = 0,
  behavior: givenBehavior,
  windowOverlayEnabledIOS,
  ...viewProps
}) => {
  const behavior =
    givenBehavior || (Platform.OS === 'android' ? 'height' : undefined);

  return (
    <FullWindowOverlay windowOverlayEnabledIOS={windowOverlayEnabledIOS}>
      <TouchableWithoutFeedback
        onPress={Platform.OS === 'web' ? undefined : Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={[
            styles.container,
            StyleSheet.absoluteFill,
            { paddingBottom: bottomInset, paddingTop: topInset },
          ]}
          {...viewProps}
          behavior={behavior}>
          {children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </FullWindowOverlay>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default KeyboardAvoidingLayout;
