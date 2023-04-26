# useFadeAnimationStyle

## Overview

`useFadeAnimationStyle` is opacity animation hooks using Reanimated

## Type

```ts
interface FadeAnimationConfigs {
  minOpacity?: number;
  maxOpacity?: number;
  animationConfig?: WithTimingConfig;
}
```

## Example

```tsx title="MyCustomUI.tsx"
import Animated from 'react-native-reanimated';
import { useFadeAnimationStyle } from 'react-native-global-components';

const MyCustomUI = () => {
  const { style: fade } = useFadeAnimationStyle({
    minOpacity: 0.3,
    maxOpacity: 1,
  });

  return <Animated.View style={[fade, { backgroundColor: '#000000' }]} />;
};
```

then

- opacity animates 0.3 to 1 on mount
- opacity animates 1 to 0.3 on unmount
