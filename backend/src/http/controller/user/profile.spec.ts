import { app } from '@/app'
import request from 'supertest'

describe('Profile (e2e)', () => {
  it('should be get profile user', async () => {
    await request(app).post('/users').send({
      name: 'John Doe',
      email: 'john2@doe.com',
      password: '123456',
    })

    const authenticateResponse = await request(app).post('/sessions').send({
      email: 'john2@doe.com',
      password: '123456',
    })

    const token = authenticateResponse.body.token

    console.log(token)

    const response = await request(app).get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: 'john@doe.com',
        password: '123456',
      })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        email: 'john2@doe.com',
      }),
    )
  })
})
