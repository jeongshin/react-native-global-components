import React from 'react';
import GlobalComponentManager from '../manager/GlobalComponentManager';
import createPortal from './createPortal';
import { PortalProps } from '@/types';
import { InferFCProps } from '@/types/utils';

function createGlobalComponentFactory({
  Manager,
  Portal,
}: {
  Manager: GlobalComponentManager;
  Portal: React.FC<PortalProps>;
}) {
  return function <T extends React.FC<any>, P extends InferFCProps<T>>({
    name,
    Component,
  }: {
    name: string;
    Component: T;
  }) {
    Manager.setComponent({ name, Component });

    return {
      /**
       * Request render component.
       *
       * - Inferring type from custom component is only supported for React Function Component.
       * This will be fixed in future version.
       *
       * @param {P} props props are inferred from custom component props.
       * @returns {void}
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
      show: (props: P): void => Manager.render({ name, props }),

      /**
       * Hide component if component is mounted.
       *
       * Nothing happens if component is not mounted.
       */
      hide: (): void => Manager.remove({ name }),

      /**
       * Set min delay in milliseconds before render next.
       *
       * Delay is **shared value between same global component manager**.
       *
       * For example, every global components created by `createPopUp` has shared delay value.
       * therefore, consider side effects of changing default delay value.
       *
       * @param {number} delay (default: 300)
       * @returns {void}
       */

      setDelay: (delay: number): void => Manager.setDelay(delay),

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

      Portal: createPortal(Portal, { name }),
    };
  };
}

export default createGlobalComponentFactory;
