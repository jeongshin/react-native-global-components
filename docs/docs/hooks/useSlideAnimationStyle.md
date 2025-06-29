# useSlideAnimationStyle

## Overview

`useSlideAnimationStyle` is translateY animation hooks using Reanimated

## Type

```ts
interface SlideAnimationConfig {
  animationConfig?: WithTimingConfig;
  springConfig?: WithSpringConfig;
  translateY?: number; // how much it should animate translateY from original position (default: 30)
  onHidden?: () => void;
  onShown?: () => void;
}
```

## Example

```tsx title="MyCustomUI.tsx"
import Animated from 'react-native-reanimated';
import { useSlideAnimationStyle } from 'react-native-global-components';

interface MyCustomUIProps {
  //
}

const MyCustomUI: React.FC<MyCustomUIProps> = () => {
  const { style: slide } = useSlideAnimationStyle({
    translateY: 30,
  });

  return <Animated.View style={[slide, { position: 'absolute', bottom: 0 }]} />;
};
```

then

- translateY animates 30 to 0 on mount
- translateY animates 0 to 30 on unmount
