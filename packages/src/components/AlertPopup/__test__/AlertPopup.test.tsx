import React from 'react';
import {
  act,
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import { createPopup } from '../../..';
import AlertPopup from '../AlertPopup';

let renderAPI: RenderAPI;

describe('[AlertPopup]', () => {
  it('should fire onPress on press option', async () => {
    const testID = 'Option1';
    const text = 'Good!!';

    let pressedText: string | undefined;

    const { Portal, show } = createPopup(AlertPopup);

    renderAPI = render(<Portal />);

    const onPress = (text: string) => {
      pressedText = text;
    };

    act(() => {
      show({
        title: `Hi I'm Horizontal Popup`,
        message: 'select how do you feel today',
        options: [
          { text, onPress, testID },
          { text: 'placeholder', onPress },
        ],
      });
    });

    const option = renderAPI.getByTestId(testID);

    fireEvent.press(option);

    expect(pressedText).toEqual(text);

    await waitFor(async () => {
      expect(renderAPI.toJSON()).toBeFalsy();
    });
  });
});
