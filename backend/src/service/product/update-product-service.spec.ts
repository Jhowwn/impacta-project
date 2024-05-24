import { InMemoryProductsRepository } from "test/repositories/in-memory-products-repository";
import { UpdateProductService } from "./update-product-service";

let inMemoryProductRepository: InMemoryProductsRepository
let sut: UpdateProductService

describe("Update Product", () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductsRepository()
    sut = new UpdateProductService(inMemoryProductRepository)
  })

  it('should update product with correct seller', async () => {
    inMemoryProductRepository.create({
      id: "product-01",
      name: "New Product",
      description: "Product description",
      price: "120,00",
      stock: 10,
      user_id: "user-1",
      created_at: "2024-04-24T15:03:19.171Z",
      products_sold: 10,
    })

    const product = await sut.execute({
      product_id: 'product-01',
      name: 'New Product 1',
      description: 'new Product description',
      price: '150,00',
      stock: 20,
      user_id: 'user-1',
    })

    expect(product.isRight()).toBe(true)
    expect(inMemoryProductRepository.items[0]).toMatchObject({
      id: 'product-01',
      name: 'New Product 1',
      description: 'new Product description',
      price: '150,00',
      products_sold: 10,
      stock: 20,
      user_id: 'user-1',
    })
  })
})
