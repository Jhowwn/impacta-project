import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateSeller } from 'test/utils/create-and-authenticate-seller';

describe('Create Product (e2e)', () => {
  it('should be able to create new product', async () => {
    const { token } = await createAndAuthenticateSeller()

    const response = await request(app).post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Teste',
        description: 'Teste teste',
        price: '100,00',
        stock: 10,
      })

    expect(response.status).toEqual(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String)
      }))
  })
})
