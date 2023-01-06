import React from 'react';
import { InferFCProps } from '../../types/utils';
import createPortal from '../factory/createPortal';
import SnackBarManager from './SnackBarManager';
import SnackBarPortal from './SnackBarPortal';

function createSnackBarFactory() {
  return function <T extends React.FC<any>, P extends InferFCProps<T>>({
    name,
    Component,
  }: {
    name: string;
    Component: T;
  }) {
    SnackBarManager.setComponent({ name, Component });

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
      show: (props: P): void => SnackBarManager.render({ name, props }),

      /**
       * Hide component if component is mounted.
       *
       * Nothing happens if component is not mounted.
       *
       */
      hide: (): void => SnackBarManager.remove({ name }),

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
      Portal: createPortal(SnackBarPortal, { name }),
    };
  };
}

export default createSnackBarFactory;
