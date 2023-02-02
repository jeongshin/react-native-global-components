# useUpdateGlobalComponentState

## Description

`useUpdateGlobalComponentState` is core hook for global component state management.

Here's how it looks

```ts
interface UpdateStateProps {
  hide: () => Promise<void>;
  addHideAnimation: (animation: () => Promise<void>) => void;
}
```

For example, if you want to **add hide animation before component completely dismissed**

```tsx title="YourCustomUI.tsx"
import {
  createPopup,
  useUpdateGlobalComponentState,
} from 'react-native-global-components';

const MyCustomUI = () => {
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

export default createPopup(MyCustomUI);
```

then

- asynchronous animation registered on mounted
- all registered animations called
- component unmount when all 

