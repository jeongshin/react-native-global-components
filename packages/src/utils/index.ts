import { StyleProp } from 'react-native';

export const getUniqueComponentName = <T extends React.FC>(Component: T) => {
  const unique = Math.round(Math.random() * 1234567890);
  return `${
    Component.name || Component.displayName || `GlobalComponent`
  }${unique}`;
};
