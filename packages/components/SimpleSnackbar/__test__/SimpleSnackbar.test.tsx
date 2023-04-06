import React from 'react';
import { act, render, RenderAPI, waitFor } from '@testing-library/react-native';
import { createSnackbar, SimpleSnackbar } from '../../..';

let renderAPI: RenderAPI;

describe('[SimpleSnackbar]', () => {
  it('should render without crash', async () => {
    const { show, Portal } = createSnackbar(SimpleSnackbar);

    renderAPI = render(<Portal />);

    act(() => {
      show({
        title: 'Hello👋🏻',
        description: 'My name is Jerry',
      });
    });

    await waitFor(async () => {
      expect(renderAPI.toJSON()).toBeTruthy();
    });
  });

  // it('should hide after given duration', async () => {
  //   const { show, Portal } = createSnackbar(SimpleSnackbar);

  //   renderAPI = render(<Portal />);

  //   const duration = 100;

  //   act(() => {
  //     show({
  //       title: 'Hello👋🏻',
  //       description: 'My name is Jerry',
  //       duration,
  //     });
  //   });

  //   const start = new Date().getTime();

  //   await waitFor(() => expect(renderAPI.toJSON()).toBeFalsy());

  //   const end = new Date().getTime();
  // });
});
