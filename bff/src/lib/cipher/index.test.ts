import { decryptBySecret, encryptBySecret } from '.'

test('encrypt and decript', async () => {
  const text = 'test string'
  const encrypted = await encryptBySecret(text)
  const decripted = await decryptBySecret(encrypted)
  expect(text === decripted).toBe(true)
})
