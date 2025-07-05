import React, { ReactElement } from 'react';
import {
  StyleProp,
  TouchableOpacityProps,
  ViewStyle,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextStyle,
} from 'react-native';
import Animated, { WithSpringConfig, WithTimingConfig } from 'react-native-reanimated';
import { usePopupContext } from '../../context';
import { useSlideAnimationStyle } from '../../hooks';
import { FullScreenOverlay } from '../Layout';

export interface ActionSheetProps {
  title?: string;
  description?: string;
  actions: (ActionSheetActionItem | ReactElement)[];
  cancelAction?: ReactElement | ActionSheetActionItem;
  itemHeight?: number;
  headerHeight?: number;
  gap?: number;
  bottomInset?: number;
  hideOnPressOverlay?: boolean;
  touchableOpacityProps?: TouchableOpacityProps;
  styles?: Styles;
  animationConfig?: WithTimingConfig;
  springConfig?: WithSpringConfig;
  overlayOpacity?: number;
}

interface Styles {
  title?: StyleProp<TextStyle>;
  description?: StyleProp<TextStyle>;
  header?: StyleProp<ViewStyle>;
  actionGroup?: StyleProp<ViewStyle>;
  action?: StyleProp<ViewStyle>;
  cancelAction?: StyleProp<ViewStyle>;
  container?: StyleProp<ViewStyle>;
  divider?: StyleProp<ViewStyle>;
}

export interface ActionSheetActionItem {
  text: string;
  color?: string;
  onPress?: (text: string) => void;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  testID?: string;
  leftElement?: ReactElement;
  rightElement?: ReactElement;
}

const ActionSheet: React.FC<ActionSheetProps> = ({
  title,
  description,
  actions,
  touchableOpacityProps,
  styles,
  animationConfig,
  springConfig,
  gap = 8,
  bottomInset = 8,
  hideOnPressOverlay = true,
  headerHeight: givenHeaderHeight,
  itemHeight = 54,
  cancelAction = { text: 'Cancel' },
  overlayOpacity = 0.5,
}) => {
  const headerHeight = givenHeaderHeight ?? (title || description) ? 80 : 0;

  const height = (actions.length + 1) * itemHeight + gap + headerHeight;

  const { hide } = usePopupContext();

  const { style: slideAnimation } = useSlideAnimationStyle({
    animationConfig,
    springConfig,
    translateY: height + bottomInset,
  });

  const renderHeader = () => {
    if (!title && !description) return null;

    return (
      <View>
        <View
          style={StyleSheet.flatten([
            defaultStyles.header,
            { height: headerHeight },
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
        </View>
        <View
          style={StyleSheet.flatten([defaultStyles.divider, styles?.divider])}
        />
      </View>
    );
  };

  const renderActionItem: (
    option: ActionSheetActionItem,
  ) => React.ReactElement = ({ text, color, onPress, style, testID, leftElement, rightElement, containerStyle }) => (
    <TouchableOpacity
      testID={testID}
      activeOpacity={0.8}
      {...touchableOpacityProps}
      onPress={() => {
        onPress && onPress(text);
        hide();
      }}
      style={StyleSheet.flatten([
        { height: itemHeight },
        defaultStyles.action,
        styles?.action,
        containerStyle,
      ])}>
      {leftElement}
      <Text style={StyleSheet.flatten([defaultStyles.text, { color }, style])}>
        {text}
      </Text>
      {rightElement}
    </TouchableOpacity>
  );

  return (
    <View style={defaultStyles.wrapper}>
      <FullScreenOverlay maxOpacity={overlayOpacity} hideOnPressOverlay={hideOnPressOverlay} />
      <Animated.View
        style={[
          slideAnimation,
          StyleSheet.flatten([
            defaultStyles.container,
            { bottom: bottomInset },
            { minHeight: height },
            styles?.container,
          ]),
        ]}>
        <View
          style={StyleSheet.flatten([
            defaultStyles.actionGroup,
            { marginBottom: gap },
            styles?.actionGroup,
          ])}>
          {renderHeader()}

          {actions.map((action, index) => {
            const isLast = index === actions.length - 1;
            return (
              <View key={`${index}`}>
                {React.isValidElement(action)
                  ? action
                  : renderActionItem(action as ActionSheetActionItem)}
                {!isLast && (
                  <View
                    style={StyleSheet.flatten([
                      defaultStyles.divider,
                      styles?.divider,
                    ])}
                  />
                )}
              </View>
            );
          })}
        </View>
        <View
          style={StyleSheet.flatten([
            defaultStyles.actionGroup,
            styles?.cancelAction,
          ])}>
          {React.isValidElement(cancelAction)
            ? cancelAction
            : renderActionItem(cancelAction as ActionSheetActionItem)}
        </View>
      </Animated.View>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  title: {
    fontSize: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 12,
  },
  wrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: 0,
    right: 0,
    overflow: 'visible',
  },
  container: {
    width: '100%',
    paddingHorizontal: 16,
    position: 'absolute',
  },
  action: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  actionGroup: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#ffffff',
  },
});

export default ActionSheet;
