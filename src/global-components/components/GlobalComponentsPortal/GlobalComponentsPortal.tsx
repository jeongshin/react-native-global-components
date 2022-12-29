import React from 'react';
import ConfirmationPopUpPortalHost from '../ConfirmationPopUp/ConfirmationPopUpPortalHost';

const GlobalComponentsPortal: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      {children}
      <ConfirmationPopUpPortalHost />
    </>
  );
};

export default GlobalComponentsPortal;
