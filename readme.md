# react-native-global-components

![platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS-brightgreen.svg?style=flat-square&colorB=191A17)
[![npm](https://img.shields.io/npm/v/react-native-global-components.svg?style=flat-square)](https://www.npmjs.com/package/react-native-global-components)

## Overview

> what is global component? 🤔

Global components definition in this project is components that used commonly and globally with user interactions usually Modal based UI

This project provides **easy to use and fully customizable** implement of global components.

## How it works

- Provides global component API for `SnackBar`, `PopUp`, `BottomSheet`
- Prevents **overlapped rendering** same type global components using rx observable and queue
- Once screen is occupied by global component, later `show` request is saved in queue and render asynchronously after previous global component is unmounted
- Global components are grouped by its type, global components with different types can be rendered together in screen.
- Only one global component can be mounted with same type.

## Dependencies

- [React](https://reactjs.org/) (>=17.0.2)
- [React Native](https://reactnative.dev/) (>=0.66.4)
- [Reanimated v2](https://docs.swmansion.com/react-native-reanimated/) (>=2.8.0)
- [RxJS](https://rxjs.dev/) (^7.2.0)

## Getting Started

```
$ yarn add react-native-global-components
```

```
$ npm install react-native-global-components
```

## Methods

#### show

Request render. props type `P` is inferred from custom Component. See how it works section above for details.

```ts
show: (props: P) => void;
```

#### hide

Request unmount. Nothing happens if not component is mounted.

```ts
hide: () => void;
```

#### clear

Request unmount and clear all render list.

```ts
hide: () => void;
```

#### setDelay

Delay is time in milliseconds gap between switching global components. (default: 300ms)
Changing delay can have side effects for same type global components.

ex) components created by `createPopUp` have shared delay

```ts
setDelay: (delay: number) => void;
```

#### Portal

Portal is host component to handle render request. Highly recommend to put top-level component.

```ts
Portal: () => JSX.Element;
```

if using [react navigation](https://reactnavigation.org/), recommend to put under `NavigationContainer`.

```tsx
<NavigationContainer>
  <BottomTabNavigator />
</NavigationContainer>
<ConfirmPopUp.Portal />
```

## Usage

### Pop Up

create pop up with your custom UI

```ts
// ./src/global-components/ConfirmPopUp.ts
import { createPopUp } from 'react-native-global-components';

interface MyConfirmPopUpProps {
  // any props you need
  title: string;
}

const MyConfirmPopUp: React.FC<MyConfirmPopUpProps> = (props) => {
  return <MyCustomUI {...props} />;
};

export default createPopUp({
  name: 'ConfirmPopUp',
  Component: MyConfirmPopUp,
});
```

use anywhere

```tsx
// App.tsx
import ConfirmPopUp from '../global-components/ConfirmPopUp';

const handlePress = () => {
  ConfirmPopUp.show({ title: 'hello~' });
};
```

### Bottom Sheet

> not implemented yet

### Snack Bar

> not implemented yet

### Others

### Tips

clean up

```tsx
useEffect(() => {
  return () => {
    ConfirmPopUp.clear();
  };
}, []);
```
