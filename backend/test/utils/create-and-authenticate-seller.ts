import { app } from '@/app';
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import request from 'supertest';

export async function createAndAuthenticateSeller() {
  await prisma.user.create({
    data: {
      id: 'user01',
      name: 'Seller',
      email: 'seller@seller.com',
      password_hash: await hash('123456', 6)
    }
  })

  const autheResponse = await request(app).post('/sessions').send({
    email: 'seller@seller.com',
    password: '123456'
  })

  const { token } = autheResponse.body

  return {
    token,
  }
}
