# useUpdateGlobalComponentState

## Overview

`useUpdateGlobalComponentState` is core hook for global component state management.

Here's how context looks

```ts
interface UpdateStateProps {
  hide: () => Promise<void>;
  addHideAnimation: (animation: () => Promise<void>) => void;
}
```

## Example

### `addHideAnimation`

For example, if you want to add hide animation before component dismissed

```tsx title="MyCustomPopup.tsx"
import {
  createPopup,
  useUpdateGlobalComponentState,
} from 'react-native-global-components';

const MyCustomPopup = () => {
  const { addHideAnimation, hide } = useUpdateGlobalComponentState();

  useEffect(() => {
    opacity.value = withTiming(1);

    addHideAnimation(() => {
      return new Promise((resolve) => {
        opacity.value = withTiming(0, {}, () => runOnJS(resolve)());
      });
    });
  }, []);

  return <Button onPress={() => hide()} />;
};

export default createPopup(MyCustomPopup);
```

then all registered animations on mount will triggered when `hide` called parallelly with `Promise.all`

### `hide`

Hide method is used to hide current component.

For example, if you have callback on button pressed, you should call `hide` after to dismiss popup.

Unless, your component will be visible forever!! 🤯

```tsx title="MyCustomPopup.tsx"
import {
  createPopup,
  useUpdateGlobalComponentState,
} from 'react-native-global-components';

const MyCustomPopup: React.FC<{ callback: () => void }> = ({ callback }) => {
  const { hide } = useUpdateGlobalComponentState();

  return (
    <Button
      onPress={() => {
        callback();
        hide(); // Don't forget!!
      }}
    />
  );
};

export default createPopup(MyCustomPopup);
```
