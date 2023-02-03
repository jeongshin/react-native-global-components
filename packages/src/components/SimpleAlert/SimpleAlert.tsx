import React, { useEffect } from 'react';
// import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
// import {
//   createSnackbar,
//   Snackbar,
//   SnackbarProps,
//   useFadeAnimationStyle,
//   useUpdateGlobalComponentState,
//   useSlideAnimationStyle,
// } from 'react-native-global-components';
// import Animated from 'react-native-reanimated';
// import { useTheme } from 'styled-components/native';
// import { Font, IconNames, L } from '@design-system';
// import { useHapticFeedback } from '@hooks/common';

interface SimpleSnackbarProps {
  title: string;
  description?: string;
  duration?: number;
}

// // TODO(Jerry): UI 나오면 대폭 수정 필요
// const SimpleSnackbar: React.FC<SimpleSnackbarProps> = ({
//   title,
//   subtitle,
//   useHaptic = false,
//   ...props
// }) => {
//   const { style: slide } = useSlideAnimationStyle({ translateY: -30 });

//   const { style: fade } = useFadeAnimationStyle();

//   const { hide } = useUpdateGlobalComponentState();

//   const { bg_elevated } = useTheme();

//   const { haptic } = useHapticFeedback();

//   useEffect(() => {
//     useHaptic && haptic();
//   }, []);

//   return (
//     <Snackbar {...props} offsetY={70} style={slide}>
//       <Animated.View style={fade}>
//         <TouchableWithoutFeedback onPress={hide}>
//           <View style={[styles.container, { backgroundColor: bg_elevated }]}>
//             <Font type="14_semibold_single" color="text_primary">
//               {title}
//             </Font>
//             <Font type="14_medium_multi" color="text_secondary">
//               {subtitle}
//             </Font>
//           </View>
//         </TouchableWithoutFeedback>
//       </Animated.View>
//     </Snackbar>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     minWidth: 220,
//     minHeight: 50,
//     borderRadius: 24,
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//   },
// });

// export default createSnackbar(SimpleSnackbar);
