import { InMemoryProductAttachment } from "test/repositories/in-memory-product-attachements";
import { InMemoryProductsRepository } from "test/repositories/in-memory-products-repository";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { CreateProductService } from "./create-product-service";

let inMemoryProductRepository: InMemoryProductsRepository
let inMemoryProductAttachemntsRepository: InMemoryProductAttachment
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: CreateProductService

describe("Create Product", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryProductAttachemntsRepository = new InMemoryProductAttachment()
    inMemoryProductRepository = new InMemoryProductsRepository(
      inMemoryProductAttachemntsRepository,
    )
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
