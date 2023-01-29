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

interface AlertPopupProps {
  message: string;

  messageStyle?: StyleProp<TextStyle>;

  title?: string;

  titleStyle?: StyleProp<TextStyle>;

  touchableOpacityProps?: TouchableOpacityProps;

  options?: {
    text: string;
    onPress?: (text: string) => void;
    color?: string;
    textStyle?: StyleProp<TextStyle>;
    testID?: string;
  }[];

  optionContainerStyle?: StyleProp<ViewStyle>;

  optionStyle?: StyleProp<ViewStyle>;

  messageContainerStyle?: StyleProp<ViewStyle>;

  style?: StyleProp<ViewStyle>;

  vertical?: boolean;
}

const AlertPopup: React.FC<AlertPopupProps> = ({
  title,
  message,
  style,
  optionContainerStyle,
  optionStyle,
  titleStyle,
  messageStyle,
  vertical,
  messageContainerStyle,
  touchableOpacityProps,
  options = [{ text: 'Ok' }],
}) => {
  const { hide } = useUpdateGlobalComponentState();

  const { style: fade } = useFadeAnimationStyle();

  useHideOnAndroidBackPress({ enabled: true });

  return (
    <Container>
      <Overlay />
      <Animated.View style={[styles.container, fade]}>
        <View style={StyleSheet.flatten([styles.defaultStyle, style])}>
          <View style={messageContainerStyle}>
            {!!title && <Text style={titleStyle}>{title}</Text>}
            {!!message && <Text style={messageStyle}>{message}</Text>}
          </View>
          <View
            style={StyleSheet.flatten([
              optionContainerStyle,
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
                    optionStyle,
                    vertical
                      ? { width: '100%', borderTopWidth: 1 }
                      : { flex: 1, borderTopWidth: 1 },
                    !(vertical || index === 0) ? { borderLeftWidth: 1 } : {},
                  ])}
                  testID={testID}>
                  <Text
                    style={StyleSheet.flatten([
                      styles.defaultOptionTextStyle,
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

const styles = StyleSheet.create({
  container: {
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
  defaultOptionTextStyle: {
    color: '#3478f6',
    fontWeight: '500',
    textAlign: 'center',
  },
  defaultStyle: {
    width: '70%',
    borderRadius: 18,
    minWidth: 240,
    alignItems: 'center',
    backgroundColor: '#ffffffdd',
  },
});

AlertPopup.defaultProps = {
  titleStyle: {
    fontWeight: '600',
    fontSize: 18,
    paddingBottom: 8,
  },
  messageStyle: {
    fontSize: 14,
  },
  optionContainerStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionStyle: {
    borderColor: '#eeeeeeee',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainerStyle: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default AlertPopup;
