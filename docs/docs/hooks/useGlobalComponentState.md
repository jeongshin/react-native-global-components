# useGlobalComponentState

## Overview

`useGlobalComponentState` is core hook for reading current global component props context.

## Example

you should use generic to narrow current props type

```tsx title="MyCustomPopup.tsx"
import {
  createPopup,
  useGlobalComponentState,
} from 'react-native-global-components';

interface MyCustomPopupProps {
  title: string;
}

const MyCustomPopup = () => {
  const { title } = useGlobalComponentState<MyCustomPopupProps>();

  return <Text>{title}</Text>;
};

export default createPopup(MyCustomPopup);
```
