// import React, { ReactElement, useEffect, useRef, useState } from 'react';
// import { Button, View, Text } from 'react-native';
// import { storiesOf } from '@storybook/react-native';
// import { createPopup } from '../../..';
// import { waitForMilliseconds } from '../../../utils/test.utils';
// import ActionSheet from '../ActionSheet';

// export default {
//   title: 'ActionSheet',
// };

// const BasicStory = (): ReactElement => {
//   const [{ show, clear, Portal }] = useState(() =>
//     createPopup(ActionSheet, 'ActionSheetBasicStory'),
//   );

//   const [{ show: show2, Portal: Portal2 }] = useState(() =>
//     createPopup(ActionSheet, 'ActionSheetBasicStory2'),
//   );

//   const [selected, setSelected] = useState<string>('');

//   useEffect(() => {
//     return clear;
//   }, []);

//   return (
//     <>
//       <View
//         style={{
//           flex: 1,
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}>
//         <Text>
//           {selected
//             ? `selected text from action sheet is ${selected}`
//             : `please select`}
//         </Text>

//         <Button
//           title="With title & description"
//           onPress={() => {
//             show({
//               title: 'HiHi~ nice to meet you!!',
//               description: 'Welcome 👋🏻',
//               onShown: () => {
//                 console.log('shown');
//               },
//               actions: [
//                 { text: 'Action Item 1', onPress: setSelected, color: 'blue' },
//                 { text: 'Action Item 2', onPress: setSelected, color: 'red' },
//               ],
//             });
//           }}
//         />

//         <Button
//           title="Action items only"
//           onPress={() => {
//             show2({
//               actions: [
//                 {
//                   text: 'Action Item 1',
//                   onPress: setSelected,
//                   color: 'purple',
//                 },
//                 { text: 'Action Item 2', onPress: setSelected, color: 'green' },
//               ],
//             });
//           }}
//         />

//         <Button
//           title="Multiple"
//           onPress={async () => {
//             show({
//               actions: [
//                 {
//                   text: 'Action Item 1',
//                   onPress: setSelected,
//                   color: 'purple',
//                 },
//                 { text: 'Action Item 2', onPress: setSelected, color: 'green' },
//               ],
//             });

//             await waitForMilliseconds(2000);

//             show2({
//               actions: [
//                 {
//                   text: 'Action Item 1',
//                   onPress: setSelected,
//                   color: 'purple',
//                 },
//                 { text: 'Action Item 2', onPress: setSelected, color: 'green' },
//               ],
//             });
//           }}
//         />
//       </View>
//       <Portal />
//       <Portal2 />
//     </>
//   );
// };

// storiesOf('ActionSheet', module).add('Basic', () => <BasicStory />);
