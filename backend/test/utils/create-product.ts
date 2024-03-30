import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";

export async function createProductMock() {
  let product = {} as Product;
  await prisma.product.create({
    data: {
      name: 'Teste',
      description: 'Teste teste',
      price: '100,00',
      stock: 10,
      user_id: 'user01',
    }
  }).then(response => product = response)

  return {
    product
  }
}
