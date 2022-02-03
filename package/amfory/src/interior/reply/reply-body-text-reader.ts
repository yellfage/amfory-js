import type { ReplyBodyReader } from '../../reply'

export class ReplyBodyTextReader implements ReplyBodyReader<string> {
  public read(body: Body): Promise<string> {
    return body.text()
  }
}
