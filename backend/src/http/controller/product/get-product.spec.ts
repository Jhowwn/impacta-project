import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateSeller } from 'test/utils/create-and-authenticate-seller';
import { createProductMock } from 'test/utils/create-product';

describe('Get Product (e2e)', () => {
  it('should be able to get a specific product', async () => {
    const { token } = await createAndAuthenticateSeller()
    const { product } = await createProductMock()

    const response = await request(app).get(`/product/${product.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Teste',
        description: "Teste teste",
        price: '100,00',
        stock: 10,
      }))
  })
})
