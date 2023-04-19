import React, { useEffect } from 'react';
import {
  createPopup,
  AlertPopupUI,
  ActionSheetUI,
  PopupManager,
} from './packages/v1';
// import StorybookUIRoot from './storybook';

const Alert = createPopup(AlertPopupUI);
const ActionSheet = createPopup(ActionSheetUI);

export default function App() {
  // useEffect(() => {
  //   Alert.show({ title: 'please!!', message: 'helpme' });
  //   ActionSheet.show({ actions: [] });
  //   setTimeout(() => {
  //     PopupManager.hideAll();
  //   }, 3000);
  // }, []);

  return (
    <>
      <Alert.Portal />
      <ActionSheet.Portal />
    </>
  );
}
