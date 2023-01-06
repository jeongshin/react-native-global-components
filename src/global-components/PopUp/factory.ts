import React from 'react';
import { InferFCProps } from '../../types/utils';
import createPortal from '../factory/createPortal';
import PopUpManager from './PopUpManager';
import PopUpPortal from './PopUpPortal';

function createPopupFactory() {
  return function <T extends React.FC<any>, P extends InferFCProps<T>>({
    name,
    Component,
  }: {
    name: string;
    Component: T;
  }) {
    PopUpManager.setComponent({ name, Component });

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
       * const ConfirmPopUp = createPopUp({
       *   name: 'ConfirmPopUp',
       *   Component: (props: { title: string }) => <MyConfirmPopUp {...props} />,
       * });
       *
       * ConfirmPopUp.show({ title: 'hello' });
       * ```
       */
      show: (props: P): void => PopUpManager.render({ name, props }),

      /**
       * Hide component if component is mounted.
       *
       * Nothing happens if component is not mounted.
       *
       */
      hide: (): void => PopUpManager.remove({ name }),

      /**
       * Clear current queue and all visible components.
       */
      clear: (): void => PopUpManager.clear(),

      /**
       * Set min delay in milliseconds before render next.
       *
       * Delay is **shared value between same global component manager**.
       *
       * For example, every global components created by `createPopUp` has shared delay value.
       * therefore, consider side effects of changing default delay value.
       *
       * @param {number} delay (default: 300)
       */
      setDelay: (delay: number): void => PopUpManager.setDelay(delay),

      /**
       * Portal to render component.
       *
       * If using React Navigation, recommend to render under `NavigationContainer`.
       *
       * @example
       *
       * ```tsx
       * import { ConfirmationPopUp, SnackBar } from '../my-global-component-path';
       * import { NavigationContainer } from '@react-navigation/native';
       * <>
       *   <NavigationContainer>
       *     <RootNavigator />
       *   </NavigationContainer>
       *   <ConfirmationPopUp.Portal />
       *   <SnackBar.Portal />
       * </>
       * ```
       */

      Portal: createPortal(PopUpPortal, { name }),
    };
  };
}

export default createPopupFactory;
