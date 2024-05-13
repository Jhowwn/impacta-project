import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateSeller } from 'test/utils/create-and-authenticate-seller';
import { createProductMock } from 'test/utils/create-product';

describe('Update Product (e2e)', () => {
  it('should be able to update a product', async () => {
    const { token } = await createAndAuthenticateSeller()
    const { product } = await createProductMock()

    const response = await request(app).put(`/product/${product.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Update product',
        description: 'update product',
        price: '150,00',
        stock: 20,
      })

    expect(response.status).toEqual(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Update product',
        description: 'update product',
        price: '150,00',
        stock: 20,
      }))
  })
})
