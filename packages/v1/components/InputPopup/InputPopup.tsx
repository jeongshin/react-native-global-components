import React, { useState } from 'react';
import {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
  StyleSheet,
  View,
  Text,
  ButtonProps,
  Button,
  TextInput,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { usePopupContext } from '../../context';
import {
  FadeAnimationConfigs,
  useFadeAnimationStyle,
  useHideOnAndroidBackPress,
} from '../../hooks';
import { KeyboardAvoidingLayout, FullScreenOverlay } from '../Layout';
import { KeyboardAvoidingLayoutProps } from '../Layout/KeyboardAvoidingLayout/KeyboardAvoidingLayout';

type Styles = {
  title?: StyleProp<TextStyle>;
  input?: StyleProp<TextStyle>;
  description?: StyleProp<TextStyle>;
  container?: StyleProp<ViewStyle>;
  buttonContainer?: StyleProp<ViewStyle>;
};

export interface InputPopupButtonProps extends Omit<ButtonProps, 'onPress'> {
  onPress?: (text?: string) => void;
}

export interface InputPopupProps {
  title?: string;
  description?: string;
  inputProps?: TextInputProps;
  buttons?: InputPopupButtonProps[];
  renderButtons?: (text?: string) => React.ReactElement;
  fadeAnimationConfig?: FadeAnimationConfigs;

  keyboardAvoidingLayoutProps?: KeyboardAvoidingLayoutProps;
  styles?: Styles;
}

const InputPopup: React.FC<InputPopupProps> = ({
  title,
  description,
  inputProps,
  renderButtons,
  styles,
  fadeAnimationConfig,
  keyboardAvoidingLayoutProps,
  buttons = defaultButtons,
}) => {
  const [text, setText] = useState(inputProps?.value ?? '');

  const { style: fade } = useFadeAnimationStyle(fadeAnimationConfig);

  const { hide } = usePopupContext();

  useHideOnAndroidBackPress({ enabled: true });

  return (
    <KeyboardAvoidingLayout {...keyboardAvoidingLayoutProps}>
      <FullScreenOverlay />
      <Animated.View style={[defaultStyles.wrapper, fade]}>
        <View
          style={StyleSheet.flatten([
            defaultStyles.container,
            styles?.container,
          ])}>
          {!!title && (
            <Text
              style={StyleSheet.flatten([defaultStyles.title, styles?.title])}>
              {title}
            </Text>
          )}

          {!!description && (
            <Text
              style={StyleSheet.flatten([
                defaultStyles.description,
                styles?.description,
              ])}>
              {description}
            </Text>
          )}

          <TextInput
            {...inputProps}
            value={text}
            onChangeText={setText}
            style={StyleSheet.flatten([
              defaultStyles.textInput,
              styles?.input,
              inputProps?.style,
            ])}
          />

          <View
            style={StyleSheet.flatten([
              defaultStyles.buttonContainer,
              styles?.buttonContainer,
            ])}>
            {typeof renderButtons === 'function'
              ? renderButtons(text)
              : buttons.map(({ onPress, ...props }, index) => (
                  <Button
                    {...props}
                    onPress={() => {
                      onPress && onPress(text);
                      hide();
                    }}
                    key={`${title}-${index}`}
                  />
                ))}
          </View>
        </View>
      </Animated.View>
    </KeyboardAvoidingLayout>
  );
};

const defaultButtons: InputPopupButtonProps[] = [
  { title: 'Cancel', color: 'black' },
  { title: 'Confirm' },
];

const defaultStyles = StyleSheet.create({
  container: {
    width: '70%',
    borderRadius: 18,
    minWidth: 240,
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    padding: 12,
  },
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
  title: {
    fontSize: 18,
    paddingBottom: 8,
  },
  description: {
    paddingBottom: 8,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    paddingTop: 12,
  },
  textInput: {
    width: '100%',
    borderColor: '#eee',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
});

export default InputPopup;
