import type { ReplyBodyReader } from '../../reply'

export class ReplyBodyArrayBufferReader
  implements ReplyBodyReader<ArrayBuffer>
{
  public read(body: Body): Promise<ArrayBuffer> {
    return body.arrayBuffer()
  }
}
