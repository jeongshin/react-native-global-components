import React from 'react';

const ConfirmationPopUpContext =
  React.createContext<null | ConfirmationPopUpProps>(null);

export type ConfirmationPopUpProps = {
  yesText: string;
  noText?: string;
  onPressYes?: () => void;
  onPressNo?: () => void;
};

export default ConfirmationPopUpContext;
