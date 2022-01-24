import type { ReplyBodyReader } from '../../reply'

export class ReplyBodyBlobReader implements ReplyBodyReader<Blob> {
  public read(body: Body): Promise<Blob> {
    return body.blob()
  }
}
