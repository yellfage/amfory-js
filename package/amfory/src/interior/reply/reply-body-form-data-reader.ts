import type { ReplyBodyReader } from '../../reply'

export class ReplyBodyFormDataReader implements ReplyBodyReader<FormData> {
  public read(body: Body): Promise<FormData> {
    return body.formData()
  }
}
