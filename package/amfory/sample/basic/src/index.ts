/* eslint-disable no-console */
import {
  AmforyClientBuilder,
  BasicLoggerBuilder,
  BasicRetryControlBuilder,
  BasicRetryDelaySchemeBuilder,
  LogLevel,
  ReplyStatus,
} from '@yellfage/amfory'

import { GlobalPluginBuilder } from './global-plugin-builder'

import { LocalPluginBuilder } from './local-plugin-builder'

const client = new AmforyClientBuilder('https://httpbin.org')
  .configureLogging((builder) =>
    builder.setLoggerBuilder(new BasicLoggerBuilder().setLevel(LogLevel.Debug)),
  )
  .configureInquiry((builder) =>
    builder
      .setHeaders({ 'x-custom-global-header': 'value' })
      .setRejectionDelay(90000)
      .setAttemptRejectionDelay(15000)
      .setRetryControlBuilder(
        new BasicRetryControlBuilder().setRetryableStatuses([
          ReplyStatus.NotFound,
          ReplyStatus.InternalServerError,
        ]),
      )
      .setRetryDelaySchemeBuilder(
        new BasicRetryDelaySchemeBuilder()
          .setMinDelayOffset(0)
          .setMaxDelayOffset(1000)
          .setDelays([500, 1000, 2000]),
      ),
  )
  .build()

client.use(new GlobalPluginBuilder().setFoo('bar'))

client.on('inquiry', (event) =>
  console.log('Global inquiry event handler', event),
)
client.on('reply', (event) => console.log('Global reply event handler', event))
client.on('retry', (event) => console.log('Global retry event handler', event))

//
;(async () => {
  const getReply = await client
    .inquire('GET')
    .setPath('/get')
    .addParams({
      first: 'first-value',
      second: 'second-value',
      third: 'third-value',
    })
    .fetchJson()

  console.log(getReply)

  const postReply = await client
    .inquire('POST')
    .use(new LocalPluginBuilder())
    .setPath('/post')
    .addHeaders({ 'x-custom-local-header': 'value' })
    .on('inquiry', (event) => console.log('Local inquiry event handler', event))
    .on('reply', (event) => console.log('Local reply event handler', event))
    .on('retry', (event) => console.log('Local retry event handler', event))
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
