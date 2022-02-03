export interface Plugin {
  initialize(): void | Promise<void>
  terminate(): void | Promise<void>
}
