# FullScreenLayout

Full screen with absolute position for UI customization.

## Example

```tsx
const YourCustomUI = (props) => {
  return (
    <FullScreenLayout>
      <FullScreenOverlay hideOnPressOverlay />
      <View>{/* write code */}</View>
    </FullScreenLayout>
  );
};

export default createPopup(YourCustomUI);
```

## Props

### `bottomInset`

padding bottom

| Type   | Default | Required |
| ------ | ------- | -------- |
| number | 0       | NO       |

### `topInset`

| Type   | Default | Required |
| ------ | ------- | -------- |
| number | 0       | NO       |
