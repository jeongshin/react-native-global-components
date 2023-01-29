import React from 'react';
import { render, RenderAPI, waitFor } from '@testing-library/react-native';
import createSnackbar from '../index';
import Snackbar from '../Snackbar';

let renderAPI: RenderAPI;

describe('[SnackbarAPI]', () => {
  it('show component without crash', async () => {
    const testID = 'SnackBar';

    const { Portal, show } = createSnackbar(() => {
      return <Snackbar testID={testID} />;
    });

    renderAPI = render(<Portal />);

    show();

    await waitFor(() => {
      expect(renderAPI.toJSON()).toBeTruthy();
    });
  });

  // TODO: add testing
});
