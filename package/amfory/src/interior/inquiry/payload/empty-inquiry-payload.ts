import type { InquiryPayload } from '../../../inquiry'

export class EmptyInquiryPayload implements InquiryPayload {
  public serialize(): Promise<null> {
    return Promise.resolve(null)
  }
}
