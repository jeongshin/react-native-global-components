import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  TouchableOpacity,
} from 'react-native';
import {
  useUpdateGlobalComponentState,
  useFadeAnimationStyle,
  useHideOnAndroidBackPress,
  Container,
  Overlay,
} from 'react-native-global-components';
import Animated from 'react-native-reanimated';
import { FadeAnimationConfigs } from '../../hooks/useFadeAnimationStyle';

export interface AlertPopupOption {
  text: string;
  onPress?: (text: string) => void;
  color?: string;
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
}

type Styles = {
  option?: StyleProp<ViewStyle>;
  container?: StyleProp<ViewStyle>;
  message?: StyleProp<TextStyle>;
  title?: StyleProp<TextStyle>;
  optionContainer?: StyleProp<ViewStyle>;
  messageContainer?: StyleProp<ViewStyle>;
};

export interface AlertPopupProps {
  message: string;
  title?: string;
  options?: AlertPopupOption[];
  touchableOpacityProps?: TouchableOpacityProps;
  vertical?: boolean;
  styles?: Styles;
  animation?: FadeAnimationConfigs;
}

const AlertPopup: React.FC<AlertPopupProps> = ({
  title,
  message,
  styles,
  vertical,
  touchableOpacityProps,
  animation,
  options = [{ text: 'Ok' }],
}) => {
  const { hide } = useUpdateGlobalComponentState();

  const { style: fade } = useFadeAnimationStyle(animation);

  useHideOnAndroidBackPress({ enabled: true });

  return (
    <Container>
      <Overlay />
      <Animated.View style={[defaultStyles.wrapper, fade]}>
        <View
          style={StyleSheet.flatten([
            defaultStyles.container,
            styles?.container,
          ])}>
          <View
            style={StyleSheet.flatten([
              defaultStyles.messageContainer,
              styles?.messageContainer,
            ])}>
            {!!title && (
              <Text
                style={StyleSheet.flatten([
                  defaultStyles.title,
                  styles?.title,
                ])}>
                {title}
              </Text>
            )}
            {!!message && (
              <Text
                style={StyleSheet.flatten([
                  defaultStyles.message,
                  styles?.message,
                ])}>
                {message}
              </Text>
            )}
          </View>
          <View
            style={StyleSheet.flatten([
              defaultStyles.optionContainer,
              styles?.optionContainer,
              vertical ? { flexDirection: 'column' } : { flexDirection: 'row' },
            ])}>
            {options.map(
              ({ text, textStyle, onPress, color, testID }, index) => (
                <TouchableOpacity
                  {...touchableOpacityProps}
                  onPress={() => {
                    onPress && onPress(text);
                    hide();
                  }}
                  key={`${index}-${text}`}
                  style={StyleSheet.flatten([
                    defaultStyles.option,
                    styles?.option,
                    vertical
                      ? { width: '100%', borderTopWidth: 1 }
                      : { flex: 1, borderTopWidth: 1 },
                    !(vertical || index === 0) ? { borderLeftWidth: 1 } : {},
                  ])}
                  testID={testID}>
                  <Text
                    style={StyleSheet.flatten([
                      defaultStyles.optionTextStyle,
                      textStyle,
                      color ? { color } : {},
                    ])}>
                    {text}
                  </Text>
                </TouchableOpacity>
              ),
            )}
          </View>
        </View>
      </Animated.View>
    </Container>
  );
};

const defaultStyles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  optionTextStyle: {
    color: '#3478f6',
    fontWeight: '500',
    textAlign: 'center',
  },
  container: {
    width: '70%',
    borderRadius: 18,
    minWidth: 240,
    alignItems: 'center',
    backgroundColor: '#ffffffee',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    paddingBottom: 8,
  },
  message: {
    fontSize: 14,
  },
  optionContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  option: {
    borderColor: '#cccccc44',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AlertPopup;
