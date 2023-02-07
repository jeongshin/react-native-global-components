# createPopup

## How it works

## API Usage

Assume you are creating popup component to show user minimal profile.

### Step 1. create popup

First, implement your UI or you can use any PopupUIs we provide

You might need hooks for state management. see [useUpdateGlobalComponentState](/docs/hooks/useUpdateGlobalComponentState)

```tsx title="MyPopup.tsx"
import { createPopup } from 'react-native-global-components';

interface MyPopupProps {
  name: string;
}

const MyPopup: FC<MyPopupProps> = (props) => {
  return <View />;
};

export default createPopup(MyPopup);
```

### Step 2. register portal

Portal is where your component actually rendered when you call `show` method.

See [ReactDOM Portal](https://reactjs.org/docs/portals.html) concept though internal implementation is different.

If using [React Navigation](https://reactnavigation.org/), highly recommend to put it in `NavigationContainer` to use navigation context in global components.

```tsx title="App.tsx"
const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
      <MyPopup.Portal />
      <MySnackbar.Portal />
    </NavigationContainer>
  );
};
```

then you can do

```tsx title="MyPopup.tsx"
import { useNavigation } from '@react-navigation/native';
import {
  createPopup,
  useUpdateGlobalComponentState,
} from 'react-native-global-components';

const MyPopup: FC<MyPopupProps> = ({ name }) => {
  const navigation = useNavigation();
  const { hide } = useUpdateGlobalComponentState();

  return (
    <Button
      onPress={() => {
        navigation.navigate('MyProfileScreen', { name });
        hide();
      }}
    />
  );
};

export default createPopup(MyPopup);
```

### Step 3. use anywhere

```tsx
MyPopup.show({
  name: 'Jerry and Zeki',
});
```

## Methods

### `show`

method to show created global component

generic `T` (`MyPopupProps` for this guide) is inferred from your component props

```ts
type show = (props: T) => void;
```
