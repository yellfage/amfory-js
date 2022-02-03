export interface ReplyBodyReader<TResult> {
  read(body: Body): TResult | Promise<TResult>
}
