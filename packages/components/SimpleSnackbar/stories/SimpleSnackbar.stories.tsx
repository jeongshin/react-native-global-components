// import React, { ReactElement, useRef } from 'react';
// import { Button, View, Image } from 'react-native';
// import { storiesOf } from '@storybook/react-native';
// import { createSnackbar } from '../../..';
// import SimpleSnackbar from '../SimpleSnackbar';

// export default {
//   title: 'SimpleSnackbar',
// };

// const BasicStory = (): ReactElement => {
//   const { show, Portal } = useRef(createSnackbar(SimpleSnackbar)).current;

//   return (
//     <>
//       <View
//         style={{
//           flex: 1,
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}>
//         <Button
//           title="title only"
//           onPress={() =>
//             show({
//               title: 'Hello👋🏻',
//             })
//           }
//         />

//         <Button
//           title="title with description"
//           onPress={() =>
//             show({
//               title: 'Hello👋🏻',
//               description: 'My name is Jerry',
//             })
//           }
//         />

//         <Button
//           title="from bottom"
//           onPress={() =>
//             show({
//               title: 'Hello👋🏻',
//               description: 'My name is Jerry',
//               position: 'bottom',
//             })
//           }
//         />

//         <Button
//           title="multiline description"
//           onPress={() =>
//             show({
//               title: 'Hello👋🏻',
//               description: `My name is Jerry\nNice to meet you`,
//             })
//           }
//         />

//         <Button
//           title="with image"
//           onPress={() =>
//             show({
//               title: 'Hello👋🏻',
//               description: 'My name is Jerry',
//               leftElement: (
//                 <Image
//                   source={{
//                     uri: 'https://icon2.cleanpng.com/20171220/woq/tom-and-jerry-png-5a3aa9384280b5.4480956315137938482724.jpg',
//                   }}
//                   style={{
//                     width: 30,
//                     height: 30,
//                     borderRadius: 8,
//                   }}
//                 />
//               ),
//             })
//           }
//         />
//       </View>
//       <Portal />
//     </>
//   );
// };

// storiesOf('SimpleSnackbar', module).add('Basic', () => <BasicStory />);
