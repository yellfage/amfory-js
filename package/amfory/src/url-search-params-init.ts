export type URLSearchParamsInit = Exclude<
  ConstructorParameters<typeof URLSearchParams>[0],
  undefined
>
