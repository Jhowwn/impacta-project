import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import request from 'supertest';
import { createAndAuthenticateSeller } from 'test/utils/create-and-authenticate-seller';

describe('Fetch Product by seller (e2e)', async () => {  
  const { token } = await createAndAuthenticateSeller()

  it('should be able to fetch product by seller', async () => {

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

    const response = await request(app).get(`/fetch-products-by-seller`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body).toHaveLength(2)
  })

  it('should be able to fetch product by seller with pagination', async () => {
    for (let i = 0; i < 20; i++) {
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

    const response = await request(app).get(`/fetch-products-by-seller?page=2`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toEqual(200)
    expect(response.body).toHaveLength(2)
  })
})
