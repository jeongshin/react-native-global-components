# FullScreenOverlay

Full screen dim overlay for UI customization.

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

### `hideOnPressOverlay`

trigger `hide` on pressed

| Type    | Default | Required |
| ------- | ------- | -------- |
| boolean | false   | NO       |

### `maxOpacity`

| Type   | Default | Required |
| ------ | ------- | -------- |
| number | 0.5     | NO       |

### `minOpacity`

| Type   | Default | Required |
| ------ | ------- | -------- |
| number | 0       | NO       |

### `overlayColor`

| Type   | Default   | Required |
| ------ | --------- | -------- |
| string | '#000000' | NO       |

### `animationConfig`

reanimated `WithTimingConfig`

| Type             | Default   | Required |
| ---------------- | --------- | -------- |
| WithTimingConfig | undefined | NO       |
