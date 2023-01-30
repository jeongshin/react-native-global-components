import React from 'react';
import { render, RenderAPI, waitFor } from '@testing-library/react-native';
import createSnackbar from '../../../../factory/snackbar/index';
import SlideAnimationLayout from '../SlideAnimationLayout';

let renderAPI: RenderAPI;

describe('[SlideAnimationLayout]', () => {
  it('show component without crash', async () => {
    const testID = 'SnackBar';

    const { Portal, show } = createSnackbar(() => {
      return <SlideAnimationLayout testID={testID} />;
    });

    renderAPI = render(<Portal />);

    show();

    await waitFor(() => {
      expect(renderAPI.toJSON()).toBeTruthy();
    });
  });

  // TODO: add testing
});
