import React, { ReactElement, useRef, useState } from 'react';
import { Button, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { createPopup } from '../../..';
import InputPopup from '../InputPopup';

export default {
  title: 'InputPopup',
};

const BasicStory = (): ReactElement => {
  const [{ show, Portal }] = useState(() =>
    createPopup(InputPopup, 'InputPopup'),
  );

  const [text, setText] = useState<string>('');

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          title={text ? `Text Entered: ${text}` : `Please Enter Text`}
          onPress={() =>
            show({
              title: 'Hello👋🏻',
              description: 'Please enter your name 🥰',
              inputProps: { value: text },
              buttons: [
                { title: 'Cancel' },
                {
                  title: 'Enter',
                  onPress: (text) => text && setText(text),
                },
              ],
            })
          }
        />
      </View>
      <Portal />
    </>
  );
};

storiesOf('InputPopup', module).add('Basic', () => <BasicStory />);
