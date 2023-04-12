import React from 'react';
import { View } from 'react-native';
import { act, render, RenderAPI, waitFor } from '@testing-library/react-native';
import createPopup from '..';

let renderAPI: RenderAPI;

describe('[Snackbar API]', () => {
  it('show component without crash', async () => {
    const { Portal, show } = createPopup(() => {
      return <View />;
    });

    renderAPI = render(<Portal />);

    act(() => {
      show();
    });

    await waitFor(() => {
      expect(renderAPI.toJSON()).toBeTruthy();
    });
  });
});
