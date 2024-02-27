import { UniqueEntityID } from "@/core/entities/unique-entity-id";
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
      attachmentsIds: ["1", "2"]
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryProductRepository.items[0]).toEqual(result.value?.product)
    expect(inMemoryProductRepository.items[0].attachments.compareItems).toHaveLength(2)
    expect(inMemoryProductRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') })
    ])
  })

  it('should persist attachments when creating a new Product', async () => {
    const result = await sut.execute({
      name: "New Product",
      description: "Product description",
      price: "120,00",
      stock: 10,
      user_id: "user",
      attachmentsIds: ["1", "2"]
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryProductAttachemntsRepository.items).toHaveLength(2)
    expect(inMemoryProductAttachemntsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityID('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityID('2'),
        }),
      ]),
    )
  })
})
