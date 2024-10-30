import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import request from 'supertest';
import { createAndAuthenticateSeller } from 'test/utils/create-and-authenticate-seller';

describe('Get Product (e2e)', () => {
  it('should be able to get a specific product by name', async () => {
    const { token } = await createAndAuthenticateSeller()
    for (let i = 0; i < 2; i++) {
      await prisma.product.createMany({
        data: {
          name: `test ${i}`,
          description: `test ${i}`,
          price: `100,00`,
          stock: 20,
          user_id: 'user01'
        }
      })
    }

    const response = await request(app).get(`/fetch-products-by-name-seller/${'Test'}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body.products).toHaveLength(2)
  })
})
