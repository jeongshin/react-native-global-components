# AlertPopup

## Overview

## Usage

Using Default

### Step 1. create popup

```tsx
// AlertPopup.tsx
import { AlertPopup, createPopup } from 'react-native-global-components';
export default createPopup(AlertPopup);
```

or you can override

```tsx
// AlertPopup.tsx
import {
  AlertPopup,
  AlertPopupProps,
  createPopup,
} from 'react-native-global-components';

const styles = StyleSheet.create({
  // override default styles
});

export default createPopup((props: Partial<AlertPopupProps>) => (
  <AlertPopup {...props} style={styles.style} />
));
```

### Step 2. register portal

```tsx
// App.tsx
const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
      <AlertPopup.Portal />
    </NavigationContainer>
  );
};
```

### Step 3. use anywhere

```tsx
const [selected, setSelected] = useState<string>('');

useEffect(() => {
  AlertPopup.show({
    title: `Hi I'm Vertical Popup`,
    message: 'select how do you feel today',
    vertical: true,
    options: [
      { text: 'Good 😝', onPress: setSelected },
      {
        text: 'Not Okay 😢',
        color: 'green',
        onPress: setSelected,
      },
      { text: `Don't ask me 😡`, color: 'red', onPress: setSelected },
    ],
  });
}, []);
```

## UI Props

### `message`

message to show

| Type   | Default   | Required |
| ------ | --------- | -------- |
| string | undefined | YES      |

### `title`

title text to show above message

| Type   | Default   | Required |
| ------ | --------- | -------- |
| string | undefined | NO       |

### `options`

options buttons to show. see option interface below

| Type               | Default          | Required |
| ------------------ | ---------------- | -------- |
| AlertPopupOption[] | [{ text: 'Ok' }] | NO       |

```ts
interface AlertPopupOption {
  text: string;
  onPress?: (text: string) => void;
  color?: string;
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
}
```

### `touchableOpacityProps`

touchableOpacity props to override default settings

| Type                  | Default   | Required |
| --------------------- | --------- | -------- |
| TouchableOpacityProps | undefined | NO       |
