import { ElvyClientFactory } from '../../../src'

const client = new ElvyClientFactory().create((options) => {
  options.request.baseUrl = 'https://httpbin.org'
})

client.on('request', (event) => console.log('Request', event))
client.on('request-result', (event) => console.log('Request Result', event))
client.on('request-retry', (event) => console.log('Request Retry', event))
//
;(async () => {
  // You can use a full URL instead of a path
  const getResult = await client.get('https://httpbin.org/get')

  console.log(getResult)

  const postResult = await client.post<Foo>('/post', {
    bar: 'baz'
  })

  console.log(postResult)

  const putResult = await client.put<Foo>('/put', {
    bar: 'baz'
  })

  console.log(putResult)

  const deleteResult = await client.delete<Foo>('/delete', {
    bar: 'baz'
  })

  console.log(deleteResult)

  const patchResult = await client.patch<Foo>('/patch', {
    bar: 'baz'
  })

  console.log(patchResult)

  const requestResult = await client.request<Foo>({
    url: '/get',
    method: 'GET'
  })

  console.log(requestResult)
})()

type Foo = {
  bar: string
}
