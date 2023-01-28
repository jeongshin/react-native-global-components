export const waitForMilliseconds = (s: number) =>
  new Promise((resolve) => setTimeout(resolve, s));
