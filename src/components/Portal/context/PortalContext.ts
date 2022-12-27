import React from 'react';

type PortalContextType = {
  open: () => void;
};

const PortalContext = React.createContext<PortalContextType | null>(null);

export default PortalContext;
