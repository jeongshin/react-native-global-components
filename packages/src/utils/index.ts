export const getUniqueComponentName = <T extends React.FC>(
  Component: T,
  name?: string,
) => {
  const unique = Math.round(Math.random() * 1234567890);
  return `${
    name || Component.name || Component.displayName || `GlobalComponent`
  }${unique}`;
};
