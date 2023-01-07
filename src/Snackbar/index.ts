import React from 'react';
import createPortal from '../factory/createPortal';
import { InferFCProps } from '../types/utils';
import SnackbarManager from './SnackbarManager';
import SnackbarPortal from './SnackbarPortal';

function createSnackbar<T extends React.FC<any>, P extends InferFCProps<T>>(
  Component: T,
) {
  const name = Component.name;

  SnackbarManager.setComponent({ name, Component });

  return {
    /**
     * Request render component.
     *
     * - Inferring type from custom component is only supported for React Function Component.
     * This will be fixed in future version.
     *
     * @param {P} props props are inferred from custom component props.
     *
     * @example
     */
    show: (...[props]: undefined extends P ? [] : [P]): void =>
      SnackbarManager.render({ name, props }),

    /**
     * Hide component if component is mounted.
     *
     * Nothing happens if component is not mounted.
     *
     */
    hide: (): void => SnackbarManager.remove({ name }),

    /**
     * Portal to render component.
     *
     * If using React Navigation, recommend to render under `NavigationContainer`.
     *
     * @example
     *
     * ```tsx
     * import { ConfirmationPopup, Snackbar } from '../my-global-component-path';
     * import { NavigationContainer } from '@react-navigation/native';
     * <>
     *   <NavigationContainer>
     *     <RootNavigator />
     *   </NavigationContainer>
     *   <ConfirmationPopup.Portal />
     *   <Snackbar.Portal />
     * </>
     * ```
     */
    Portal: createPortal(SnackbarPortal, { name }),
  };
}

export default createSnackbar;
