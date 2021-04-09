import { ClientBuilder } from '../../../src'

const client = new ClientBuilder().build()

client.request.add(() => console.log('Request'))
client.requestCompletion.add(() => console.log('Request completion'))
client.requestRetry.add(() => console.log('Request retry'))

//
;(async () => {
  const resultGet = await client.get<string>('https://httpbin.org/get')

  console.log('GET', resultGet)

  const resultPost = await client.post<Foo, string>(
    'https://httpbin.org/post',
    {
      foo: 'bar'
    }
  )

  console.log('POST', resultPost)

  const resultPut = await client.put<Foo, string>('https://httpbin.org/put', {
    foo: 'bar'
  })

  console.log('PUT', resultPut)

  const resultDelete = await client.delete<Foo, string>(
    'https://httpbin.org/delete',
    {
      foo: 'bar'
    }
  )

  console.log('DELETE', resultDelete)

  const resultPatch = await client.patch<Foo, string>(
    'https://httpbin.org/patch',
    {
      foo: 'bar'
    }
  )

  console.log('PATCH', resultPatch)
})()

type Foo = {
  foo: string
}
