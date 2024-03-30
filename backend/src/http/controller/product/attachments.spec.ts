import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateSeller } from 'test/utils/create-and-authenticate-seller';
import { createProductMock } from 'test/utils/create-product';

describe('Create Product Attachment (e2e)', () => {
  it.skip('should be able to create new product attachment', async () => {
    const { token } = await createAndAuthenticateSeller()
    const { product } = await createProductMock()

    const response = await request(app).post(`/product/${product?.id}/attachment`)
    .set('Authorization', `Bearer ${token}`)
    .attach('attachment',  './test/e2e/sample-upload.jpg')

    console.log(response.body)

    expect(response.status).toEqual(201)
  })
})
