export type InferProps<T> = T extends React.FC<infer Props>
  ? Props extends Record<string, never>
    ? undefined
    : Props
  : never;
