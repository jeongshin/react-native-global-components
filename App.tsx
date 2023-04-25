import React, { useEffect } from 'react';
import {
  createPopup,
  AlertPopupUI,
  ActionSheetUI,
  PopupManager,
  SimpleSnackbarUI,
} from './packages/v1';
// import StorybookUIRoot from './storybook';

const Alert = createPopup(AlertPopupUI);
const ActionSheet = createPopup(ActionSheetUI);
const Snackbar = createPopup(SimpleSnackbarUI);

export default function App() {
  useEffect(() => {
    // Alert.show({ title: 'please!!', message: 'helpme' });
    // ActionSheet.show({ actions: [] });
    // setTimeout(() => {
    //   PopupManager.hideAll();
    // }, 3000);
    Snackbar.show({ title: 'hi~' });
  }, []);

  return (
    <>
      <Alert.Portal />
      <ActionSheet.Portal />
      <Snackbar.Portal />
    </>
  );
}
