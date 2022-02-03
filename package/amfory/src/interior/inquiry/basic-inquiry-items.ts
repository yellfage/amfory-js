import type { InquiryItems } from '../../inquiry'

export class BasicInquiryItems implements InquiryItems {
  private readonly map = new Map<unknown, unknown>()

  public get<TValue>(key: string): TValue {
    if (!this.map.has(key)) {
      throw new Error(`The inquiry item with the key "${key}" not found`)
    }

    return this.map.get(key) as TValue
  }

  public set<TValue = unknown>(key: string, value: TValue): this {
    this.map.set(key, value)

    return this
  }

  public delete(key: string): boolean {
    return this.map.delete(key)
  }

  public has(key: string): boolean {
    return this.map.has(key)
  }
}
