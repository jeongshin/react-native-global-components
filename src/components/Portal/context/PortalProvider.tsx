import React from 'react';

const PortalProvider: React.FC<PortalProviderProps> = ({ children }) => {
  return <>{children}</>;
};

type PortalProviderProps = {
  children?: React.ReactElement;
};

/**
 * const { show } = useGlobalComponent('ConfirmationPopUp');
 *
 *
 */

export default PortalProvider;
