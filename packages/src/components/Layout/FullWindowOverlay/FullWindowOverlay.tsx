import React from 'react';
import { Platform } from 'react-native';
import { FullWindowOverlay as RNFullWindowOverlay } from 'react-native-screens';

interface FullWindowOverlayProps {
  windowOverlayEnabledIOS?: boolean;
  children: React.ReactNode;
}

const FullWindowOverlay: React.FC<FullWindowOverlayProps> = ({
  children,
  windowOverlayEnabledIOS = true,
}) => {
  return Platform.OS === 'ios' && windowOverlayEnabledIOS ? (
    <RNFullWindowOverlay>{children}</RNFullWindowOverlay>
  ) : (
    <>{children}</>
  );
};

export default FullWindowOverlay;
