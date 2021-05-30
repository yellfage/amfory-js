import { ClientBuilder } from '../../../src'

const client = new ClientBuilder().build({
  request: { baseUrl: 'https://httpbin.org' }
})

client.request.add(() => console.log('Request'))
client.requestCompletion.add(() => console.log('Request completion'))
client.requestRetry.add(() => console.log('Request retry'))

//
;(async () => {
  // Overwrite base url
  const firstGetResult = await client.get<string>('', {
    baseUrl: 'https://httpbin.org/get'
  })

  console.log(firstGetResult)

  // Use a full URL instead of a path
  const secondGetResultGet = await client.get<string>('https://httpbin.org/get')

  console.log(secondGetResultGet)

  const postResult = await client.post<Foo, string>('/post', {
    foo: 'bar'
  })

  console.log(postResult)

  const putResult = await client.put<Foo, string>('/put', {
    foo: 'bar'
  })

  console.log(putResult)

  const deleteResult = await client.delete<Foo, string>('/delete', {
    foo: 'bar'
  })

  console.log(deleteResult)

  const patchResult = await client.patch<Foo, string>('/patch', {
    foo: 'bar'
  })

  console.log(patchResult)
})()

type Foo = {
  foo: string
}
