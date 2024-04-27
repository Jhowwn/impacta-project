import { InMemoryProductsRepository } from "test/repositories/in-memory-products-repository";
import { CreateProductService } from "./create-product-service";

let inMemoryProductRepository: InMemoryProductsRepository
let sut: CreateProductService

describe("Create Product", () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductsRepository()
    sut = new CreateProductService(inMemoryProductRepository)
  })

  it('should create a new product', async () => {
    const result = await sut.execute({
      name: "New Product",
      description: "Product description",
      price: "120,00",
      stock: 10,
      user_id: "user",
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryProductRepository.items[0]).toEqual(result.value?.product)
  })

  it('should persist attachments when creating a new Product', async () => {
    const result = await sut.execute({
      name: "New Product",
      description: "Product description",
      price: "120,00",
      stock: 10,
      user_id: "user",
    })

    expect(result.isRight()).toBe(true)
  })
})
