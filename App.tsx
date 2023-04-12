import React, { useEffect } from 'react';
// import StorybookUIRoot from './storybook';
import { View } from 'react-native';
import { createPopup, AlertPopupUI } from './packages/v1';

const Alert = createPopup(AlertPopupUI);

export default function App() {
  // useEffect(() => {
  //   Alert.show({ title: 'please!!', message: 'helpme' });

  //   setTimeout(() => {
  //     Alert.hide();
  //   }, 3000);
  // }, []);

  return (
    <>
      <View></View>
      <Alert.Portal />
    </>
  );
}
