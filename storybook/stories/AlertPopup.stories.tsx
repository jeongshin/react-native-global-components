import React, { ReactElement, useState } from 'react';
import { Button, View, Text } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { AlertPopupUI, createPopup } from '../../packages/v1';

export default {
  title: 'AlertPopup',
};

const BasicStory = (): ReactElement => {
  const [{ show, Portal }] = useState(() => createPopup(AlertPopupUI));

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
            ? `selected text from alert popup is ${selected}`
            : `please open alert`}
        </Text>

        <Button
          title="Open Alert Vertical"
          onPress={() => {
            show({
              title: `Hi I'm Vertical Popup`,
              message: 'select how do you feel today',
              vertical: true,
              options: [
                { text: 'Good 😝', onPress: setSelected },
                {
                  text: 'Not Okay 😢',
                  color: 'green',
                  onPress: setSelected,
                },
                { text: `Don't ask me 😡`, color: 'red', onPress: setSelected },
              ],
            });
          }}
        />

        <Button
          title="Open Alert Horizontal"
          onPress={() => {
            show({
              title: `Hi I'm Horizontal Popup`,
              message: 'select how do you feel today',
              options: [
                { text: 'Good 😝', onPress: setSelected },
                {
                  text: 'Not Okay 😢',
                  color: 'green',
                  onPress: setSelected,
                },
                { text: `Don't ask me 😡`, color: 'red', onPress: setSelected },
              ],
            });
          }}
        />
      </View>
      <Portal />
    </>
  );
};

storiesOf('AlertPopup', module).add('Basic', () => <BasicStory />);
