import { InMemoryProductAttachment } from "test/repositories/in-memory-product-attachements";
import { InMemoryProductsRepository } from "test/repositories/in-memory-products-repository";
import { InMemoryUsersRepository } from "test/repositories/in-memory-users-repository";
import { ListProductsBySellerService } from "./list-product-by-seller-service";

let inMemoryProductRepository: InMemoryProductsRepository
let inMemoryProductAttachemntsRepository: InMemoryProductAttachment
let inMemoryUsersRepository: InMemoryUsersRepository
let sut: ListProductsBySellerService

describe("Create Product", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryProductAttachemntsRepository = new InMemoryProductAttachment()
    inMemoryProductRepository = new InMemoryProductsRepository(
      inMemoryProductAttachemntsRepository,
    )
    sut = new ListProductsBySellerService(inMemoryProductRepository)
  })

  it('should create a new product', async () => {
    inMemoryProductRepository.create({
      id: "product-01",
      name: "New Product",
      description: "Product description",
      price: "120,00",
      stock: 10,
      user_id: "user-1",
    })

    inMemoryProductRepository.create({
      id: "product-02",
      name: "New Product",
      description: "Product description",
      price: "120,00",
      stock: 10,
      user_id: "user-1",
    })

    const { products } = await sut.execute({
      userId: 'user-1',
      page: 1
    })
    
    expect(products).toHaveLength(2)
    expect(products).toEqual([
      expect.objectContaining({ id: 'product-01' }),
      expect.objectContaining({ id: 'product-02' }),
    ])
  })

})
