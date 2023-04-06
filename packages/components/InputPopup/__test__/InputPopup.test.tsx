import React from 'react';
import {
  act,
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import { createPopup } from '../../..';
import InputPopup from '../InputPopup';

let renderAPI: RenderAPI;

describe('[InputPopup]', () => {
  it('should fire onPress with given input text then hide', async () => {
    const testID = 'Option1';
    const text = 'Good!!';

    let pressedText: string | undefined;

    const { Portal, show } = createPopup(InputPopup, 'InputPopup');

    renderAPI = render(<Portal />);

    const onPress = (text: string | undefined) => {
      pressedText = text;
    };

    act(() => {
      show({
        inputProps: { value: text },
        buttons: [{ title: 'Cancel' }, { title: 'Confirm', testID, onPress }],
      });
    });

    const option = renderAPI.getByTestId(testID);

    fireEvent.press(option);

    expect(pressedText).toEqual(text);

    await waitFor(async () => {
      expect(renderAPI.toJSON()).toBeFalsy();
    });
  });

  // TODO: add testing for input
});
