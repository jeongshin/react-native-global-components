# useHideOnAndroidBackPress

## Overview

hooks to hide popup on android hardware back button pressed

## Example

you should use generic to narrow current props type

```tsx title="MyCustomPopup.tsx"
import {
  createPopup,
  useHideOnAndroidBackPress,
  usePopupContext,
} from 'react-native-global-components';

interface MyCustomPopupProps {
  //
}

const MyCustomPopup = () => {
  const { hide } = usePopupContext();

  // this will trigger hide on android hardware back button pressed!
  useHideOnAndroidBackPress({ enabled: true });

  return <View>{}</View>;
};

export default createPopup(MyCustomPopup);
```
