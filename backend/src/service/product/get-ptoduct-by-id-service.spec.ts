import { InMemoryProductsRepository } from "test/repositories/in-memory-products-repository";
import { GetProductService } from "./get-ptoduct-by-id-service";


let inMemoryProductRepository: InMemoryProductsRepository
let sut: GetProductService

describe("Get Product by Id", () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductsRepository()
    sut = new GetProductService(inMemoryProductRepository)
  })

  it('should get product by id', async () => {
    inMemoryProductRepository.create({
      id: "product-01",
      name: "New Product",
      description: "Product description",
      price: "120,00",
      stock: 10,
      user_id: "user-1",
      products_sold: 10,
    })

    const product = await sut.execute({
      product_id: 'product-01'})

    expect(product.isRight()).toBe(true)
    expect(inMemoryProductRepository.items[0]).toMatchObject({
      id: 'product-01',
      name: "New Product",
      description: "Product description",
      price: "120,00",
      stock: 10,
      user_id: "user-1",
      products_sold: 10,
    })
  })
})
