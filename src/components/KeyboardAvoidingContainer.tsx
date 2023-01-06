import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

interface KeyboardAvoidingContainerProps extends KeyboardAvoidingViewProps {
  bottomInset?: number;
  topInset?: number;
  children?: React.ReactNode;
}

/**
 * Full screen container with keyboard avoiding view.
 *
 * Use `keyboardVerticalOffset` props adjust vertical offset of pop up contents.
 *
 * @param {React.ReactNode} p.children
 * @param {number} p.bottomInset bottom padding (default: 0)
 * @param {number} p.topInset top padding (default: 0)
 *
 * @example
 *
 * ```tsx
 * <KeyboardAvoidingContainer behavior="padding" keyboardVerticalOffset={-100}>
 *   <CustomUI />
 * </KeyboardAvoidingContainer>
 * ```
 */
const KeyboardAvoidingContainer: React.FC<KeyboardAvoidingContainerProps> = ({
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
