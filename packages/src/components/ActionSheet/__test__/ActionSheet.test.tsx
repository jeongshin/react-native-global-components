import React from 'react';
import {
  act,
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import { createPopup } from '../../..';
import ActionSheet from '../ActionSheet';

let renderAPI: RenderAPI;

describe('[ActionSheet]', () => {
  it('should fire onPress for action item', async () => {
    const { Portal, show } = createPopup(ActionSheet);
    renderAPI = render(<Portal />);

    const testID = 'ACTION_1';
    const text = 'action item 1';

    let pressedText: string | undefined;

    const onPress = (text: string) => {
      pressedText = text;
    };

    act(() => {
      show({
        title: `Hi I'm Action Sheet`,
        actions: [
          {
            text,
            onPress,
            testID,
          },
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

  it('should trigger onShow callback on mounted', async () => {
    const { Portal, show } = createPopup(ActionSheet);

    renderAPI = render(<Portal />);

    let mounted = false;
    let unmounted = false;

    const duration = 100;

    const testID = 'ACTION_1';
    const text = 'action item 1';

    act(() => {
      show({
        title: `Hi I'm Action Sheet`,
        actions: [
          {
            text,
            testID,
          },
        ],
        onShow: () => {
          mounted = true;
        },
        onHidden: () => {
          unmounted = true;
        },
        animation: { duration },
      });
    });

    const option = renderAPI.getByTestId(testID);
    fireEvent.press(option);

    await waitFor(async () => {
      expect(renderAPI.toJSON()).toBeFalsy();
    });

    expect(unmounted).toBe(true);
    expect(mounted).toBe(true);
  });
});
