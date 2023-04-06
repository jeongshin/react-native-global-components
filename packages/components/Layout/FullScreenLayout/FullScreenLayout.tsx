import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import NativeView from '../NativeView/NativeView';

interface FullScreenLayoutProps {
  bottomInset?: number;
  topInset?: number;
  children?: React.ReactNode;
}

/**
 * Full screen container.
 *
 * @param {React.ReactNode} p.children
 * @param {number} p.bottomInset bottom padding (default: 0)
 * @param {number} p.topInset top padding (default: 0)
 *
 */
const FullScreenLayout: React.FC<FullScreenLayoutProps> = ({
  children,
  bottomInset = 0,
  topInset = 0,
}) => (
  <NativeView
    style={StyleSheet.flatten<ViewStyle>([
      styles.container,
      StyleSheet.absoluteFill,
      { paddingBottom: bottomInset, paddingTop: topInset },
    ])}
  >
    {children}
  </NativeView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FullScreenLayout;
