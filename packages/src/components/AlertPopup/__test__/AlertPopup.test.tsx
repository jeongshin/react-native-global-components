import React from 'react';
import { act, cleanup, render, RenderAPI } from '@testing-library/react-native';
import { createPopup } from '../../..';
import AlertPopup from '../AlertPopup';

let renderAPI: RenderAPI;

describe('[AlertPopup]', () => {
  // afterEach(() => cleanup());

  it('should fire onPress on press option', async () => {
    const testID = 'Option1';
    const text = 'Good!!';

    let pressedText: string | undefined;

    const { Portal, show, clear } = createPopup(AlertPopup);

    clear();

    renderAPI = render(<Portal />);

    const onPress = (text: string) => {
      pressedText = text;
    };

    show({
      title: `Hi I'm Horizontal Popup`,
      message: 'select how do you feel today',
      options: [
        { text, onPress, testID },
        { text: 'placeholder', onPress },
      ],
    });

    const option = await renderAPI.findByTestId(testID);

    option.props.onClick && option.props.onClick();

    expect(pressedText).toEqual(text);
  });
});
