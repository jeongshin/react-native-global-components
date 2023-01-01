import React from 'react';
import { PortalProps } from '@/types';

const createPortal = (
  PortalComponent: React.FC<PortalProps>,
  props: PortalProps,
) => {
  const Portal = () => <PortalComponent {...props} />;
  return Portal;
};

export default createPortal;
