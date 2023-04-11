import React from 'react';
import { StyleSheet, View } from 'react-native';
import FullWindowOverlay from '../FullWindowOverlay/FullWindowOverlay';

interface FullScreenLayoutProps {
  windowOverlayEnabledIOS?: boolean;
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
  windowOverlayEnabledIOS,
  bottomInset = 0,
  topInset = 0,
}) => (
  <FullWindowOverlay windowOverlayEnabledIOS={windowOverlayEnabledIOS}>
    <View
      style={[
        styles.container,
        StyleSheet.absoluteFill,
        { paddingBottom: bottomInset, paddingTop: topInset },
      ]}>
      {children}
    </View>
  </FullWindowOverlay>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FullScreenLayout;
