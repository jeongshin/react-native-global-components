# react-native-global-components

![platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS-brightgreen.svg?style=flat-square&colorB=191A17)
[![npm](https://img.shields.io/npm/v/react-native-global-components.svg?style=flat-square)](https://www.npmjs.com/package/react-native-global-components)

## Overview

> what is global component? 🤔

In this project, global component definition is 'components that used commonly and globally with user interactions'.

Global component provides **easy to use and fully customizable** implement of Modal Based UI.

## How it works

- Provides global component API for `Snackbar`, `Popup`, `BottomSheet`
- Prevents **overlapped rendering** same type global components using rx observable and queue
- Once screen is occupied by global component, later `show` request is saved in queue and render asynchronously after previous global component is unmounted
- Global components are grouped by its type, global components with different types can be rendered together in screen
- Only one global component can be mounted with same type

## Dependencies

- [React](https://reactjs.org/) (>=17.0.2)
- [React Native](https://reactnative.dev/) (>=0.66.4)
- [Reanimated v2](https://docs.swmansion.com/react-native-reanimated/) (>=2.8.0)
- [RxJS](https://rxjs.dev/) (^7.2.0)

## Getting Started

```sh
$ yarn add react-native-global-components
```

```sh
$ npm install react-native-global-components
```

# Popup

## Props

No default props for popup. Props are inferred from your custom components.

## Methods

#### `show`

Request render. props type `P` is inferred from custom component.

```ts
show: (props: P) => void;
```

#### `hide`

Request unmount. Nothing happens if not component is mounted.

```ts
hide: () => void;
```

#### `clear`

Request unmount and clear all render list.

```ts
clear: () => void;
```

#### `setDelay`

Delay is time in milliseconds gap between switching global components. (default: 300ms)

Changing delay can have side effects for same type global components

ex) All pop-ups created by `createPopup` factory have shared delay

```ts
setDelay: (delay: number) => void;
```

#### `Portal`

Portal is host component to handle render request.

```ts
Portal: () => JSX.Element;
```

if using [react navigation](https://reactnavigation.org/), recommend to put under `NavigationContainer`.

```tsx
export default function RootNavigator() {
  useEffect(() => {
    // recommend for clean up prev states on hot replacement
    return () => {
      ConfirmPopup.clear();
    };
  }, []);

  return (
    <>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
      <ConfirmPopup.Portal />
    </>
  );
}
```

## Examples

```ts
// ./src/global-components/ConfirmPopUp.ts
import { createPopup } from 'react-native-global-components';

interface MyConfirmPopupProps {
  // any props you need
  title: string;
}

const MyConfirmPopup: React.FC<MyConfirmPopupProps> = (props) => {
  return <MyCustomUI {...props} />;
};

export default createPopup({
  name: 'ConfirmPopUp',
  Component: MyConfirmPopup,
});
```

use anywhere

```tsx
// App.tsx
import ConfirmPopup from '../global-components/ConfirmPopup';

const handlePress = () => {
  ConfirmPopup.show({ title: 'hello~' });
};
```

# Snackbar

## Props

| Key      | Required | Type                         | Default     | Description                                                                                                       |
| -------- | -------- | ---------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------- |
| position | false    | 'top' \| 'bottom'            | 'bottom'    | absolute position of snackbar                                                                                     |
| duration | false    | number                       | 3000        | duration in milliseconds for how long to display snackbar. If `undefined`, never disappear until user interaction |
| offsetY  | false    | number                       | 50          | offset in px from absolute position                                                                               |
| style    | false    | AnimatedStyleProp<ViewStyle> | `undefined` | reanimated style                                                                                                  |

## Methods

#### `show`

Request render. props type `P` is inferred from custom Component.

Unlike Popup, Snackbar renders **immediately on show request** replacing previous rendered snackbar.

```ts
show: (props: P) => void;
```

#### `hide`

Request unmount. Nothing happens if not component is mounted.

```ts
hide: () => void;
```

#### `Portal`

Portal is host component to handle render request.

```ts
Portal: () => JSX.Element;
```

### Bottom Sheet

> not yet

### Others

### Tips
