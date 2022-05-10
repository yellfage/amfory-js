/* eslint-disable no-console */
import {
  AmforyClientBuilder,
  BasicLoggerBuilder,
  BasicRetryControlBuilder,
  BasicRetryDelaySchemeBuilder,
  LogLevel,
  ReplyStatus,
} from '@yellfage/amfory'

import { SampleClientPluginBuilder } from './sample-client-plugin-builder'

import { SampleInquiryPluginBuilder } from './sample-inquiry-plugin-builder'

const client = new AmforyClientBuilder('https://httpbin.org')
  .configureLogging((builder) =>
    builder.setLogger(new BasicLoggerBuilder().setLevel(LogLevel.Debug)),
  )
  .configureInquiry((builder) =>
    builder
      .setRejectionDelay(90000)
      .setAttemptRejectionDelay(15000)
      .setRetryControl(
        new BasicRetryControlBuilder().setStatuses([
          ReplyStatus.NotFound,
          ReplyStatus.InternalServerError,
        ]),
      )
      .setRetryDelayScheme(
        new BasicRetryDelaySchemeBuilder()
          .setMinDelayOffset(0)
          .setMaxDelayOffset(1000)
          .setDelays([500, 1000, 2000]),
      ),
  )
  .build()

client.use(new SampleClientPluginBuilder())

client.inquiring.add((event) =>
  console.log('Global inquiring event handler', event),
)
client.replying.add((event) =>
  console.log('Global replying event handler', event),
)
client.retrying.add((event) =>
  console.log('Global retrying event handler', event),
)

//
;(async () => {
  const getReply = await client
    .get('/get')
    .putParams({
      first: 'first-value',
      second: 'second-value',
      third: 'third-value',
    })
    .fetchJson()

  console.log(getReply)

  const postReply = await client
    .post('/post')
    .use(new SampleInquiryPluginBuilder())
    .putHeaders([['x-custom-local-header', 'value']])
    .setJsonPayload({
      first: 'first-value',
      second: 'second-value',
      third: 'third-value',
    })
    .setRejectionDelay(5000)
    .fetchJson()

  console.log(postReply)

  // ...
})()
