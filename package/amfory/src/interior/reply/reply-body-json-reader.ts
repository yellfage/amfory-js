import type { ReplyBodyReader } from '../../reply'

export class ReplyBodyJsonReader implements ReplyBodyReader<unknown> {
  public read<TResult>(body: Body): Promise<TResult> {
    return body.json() as Promise<TResult>
  }
}
