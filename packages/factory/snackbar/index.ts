import SnackbarManager from './SnackbarManager';
import SnackbarPortal from './SnackbarPortal';
import type { InferProps } from '../../types/utils';
import { getUniqueComponentName } from '../../utils';
import createPortal from '../portal';

function createSnackbar<T extends React.FC<any>, P extends InferProps<T>>(
  Component: T
) {
  const name = getUniqueComponentName(Component);

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
     *     <ConfirmationPopup.Portal />
     *     <Snackbar.Portal />
     *   </NavigationContainer>
     * </>
     * ```
     */
    Portal: createPortal(SnackbarPortal, { name }),
  };
}

export default createSnackbar;
