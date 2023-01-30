import React from 'react';
import PopupManager from './PopupManager';
import PopupPortal from './PopupPortal';
import { InferProps } from '../../types/utils';
import { getUniqueComponentName } from '../../utils';
import createPortal from '../portal';

function createPopupFactory<T extends React.FC<any>, P extends InferProps<T>>(
  Component: T,
) {
  const name = getUniqueComponentName(Component);

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
     * Set min delay in milliseconds before render next.
     *
     * Delay is **shared value between same global component manager**.
     *
     * For example, every global components created by `createPopup` has shared delay value.
     * therefore, consider side effects of changing default delay value.
     *
     * @param {number} delay (default: 300)
     */
    setDelay: (delay: number): void => PopupManager.setDelay(delay),

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
