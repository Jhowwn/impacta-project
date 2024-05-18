import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateSeller } from 'test/utils/create-and-authenticate-seller';
import { createProductMock } from 'test/utils/create-product';

describe('Delete Product (e2e)', () => {
  it('should be able to delete a product', async () => {
    const { token } = await createAndAuthenticateSeller()
    const { product } = await createProductMock()

    const response = await request(app).delete(`/product/${product.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body.message).toEqual('Product delete')
  })
})
