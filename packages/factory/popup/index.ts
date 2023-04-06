import PopupManager, { PopupManagerConfigs } from './PopupManager';
import PopupPortal from './PopupPortal';
import type { InferProps } from '../../types/utils';
import { getUniqueComponentName } from '../../utils';
import createPortal from '../portal';

function createPopupFactory<T extends React.FC<any>, P extends InferProps<T>>(
  Component: T,
  givenName?: string
) {
  const name = givenName ?? getUniqueComponentName(Component);

  PopupManager.setComponent({ name, Component });

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
     * ```tsx
     * const ConfirmPopup = createPopup({
     *   name: 'ConfirmPopup',
     *   Component: (props: { title: string }) => <MyConfirmPopup {...props} />,
     * });
     *
     * ConfirmPopup.show({ title: 'hello' });
     * ```
     */
    show: (...[props]: undefined extends P ? [] : [P]): void =>
      PopupManager.render({ name, props }),

    /**
     * Hide component if component is mounted.
     *
     * Nothing happens if component is not mounted.
     *
     */
    hide: (): void => PopupManager.remove({ name }),

    /**
     * Clear current queue and all visible components.
     */
    clear: (): void => PopupManager.clear(),

    /**
     * change PopupManagerConfigs
     */
    setConfigs: (configs: PopupManagerConfigs): void =>
      PopupManager.setConfigs(configs),

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

    Portal: createPortal(PopupPortal, { name }),
  };
}

export default createPopupFactory;