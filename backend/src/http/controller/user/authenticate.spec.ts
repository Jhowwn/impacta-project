import { app } from '@/app'
import request from 'supertest'

describe('Authenticate (e2e)', () => {
  it('should be able Authenticate user', async () => {
    await request(app).post('/users').send({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    })

    const response = await request(app).post('/sessions').send({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
  })
})
