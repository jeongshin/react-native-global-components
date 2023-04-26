import React, { ReactElement, useState } from 'react';
import { Button, View, Text } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { ActionSheetUI, createPopup } from '../../packages/v1';

export default {
  title: 'ActionSheet',
};

const BasicStory = (): ReactElement => {
  const [{ show, Portal }] = useState(() => createPopup(ActionSheetUI));

  const [selected, setSelected] = useState<string>('');

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>
          {selected
            ? `selected text from action sheet is ${selected}`
            : `please select`}
        </Text>

        <Button
          title="With title & description"
          onPress={() => {
            show({
              title: 'HiHi~ nice to meet you!!',
              description: 'Welcome 👋🏻',
              actions: [
                { text: 'Action Item 1', onPress: setSelected, color: 'blue' },
                { text: 'Action Item 2', onPress: setSelected, color: 'red' },
              ],
            });
          }}
        />

        <Button
          title="Action items only"
          onPress={() => {
            show({
              actions: [
                {
                  text: 'Action Item 1',
                  onPress: setSelected,
                  color: 'purple',
                },
                { text: 'Action Item 2', onPress: setSelected, color: 'green' },
              ],
            });
          }}
        />
      </View>
      <Portal />
    </>
  );
};

storiesOf('ActionSheet', module).add('Basic', () => <BasicStory />);
