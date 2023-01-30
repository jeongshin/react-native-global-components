import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

interface KeyboardAvoidingLayoutProps extends KeyboardAvoidingViewProps {
  bottomInset?: number;
  topInset?: number;
  children?: React.ReactNode;
}

/**
 * Full screen container with keyboard avoiding view.
 */
const KeyboardAvoidingContainer: React.FC<KeyboardAvoidingLayoutProps> = ({
  children,
  bottomInset = 0,
  topInset = 0,
  ...viewProps
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={[
          styles.container,
          StyleSheet.absoluteFill,
          { paddingBottom: bottomInset, paddingTop: topInset },
        ]}
        {...viewProps}
        behavior={viewProps.behavior || 'padding'}>
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default KeyboardAvoidingContainer;
