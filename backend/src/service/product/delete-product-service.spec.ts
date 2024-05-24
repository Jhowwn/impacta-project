import { InMemoryProductAttachment } from "test/repositories/in-memory-product-attachements";
import { InMemoryProductsRepository } from "test/repositories/in-memory-products-repository";
import { DeleteProductService } from "./delete-product-service";

let inMemoryProductRepository: InMemoryProductsRepository
let inMemoryProductAttachment: InMemoryProductAttachment
let sut: DeleteProductService

describe("Delete Product", () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductsRepository()
    inMemoryProductAttachment = new InMemoryProductAttachment()
    sut = new DeleteProductService(inMemoryProductRepository, inMemoryProductAttachment)
  })

  it('should delete product', async () => {
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

    inMemoryProductRepository.create({
      id: "product-02",
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
    })


    expect(product.isRight()).toBe(true)
    expect(inMemoryProductRepository.items.length).toEqual(1)
  })
})
