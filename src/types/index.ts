export type GlobalComponentPropsList = {
  ConfirmationPopUp: {
    yesText: string;
    noText?: string;
    onPressYes?: () => void;
    onPressNo?: () => void;
  };
};

export type GlobalComponentName = keyof GlobalComponentPropsList;
