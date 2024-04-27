import { InMemoryProductsRepository } from "test/repositories/in-memory-products-repository";
import { ListProductsBySellerService } from "./list-product-by-seller-service";

let inMemoryProductRepository: InMemoryProductsRepository
let sut: ListProductsBySellerService

describe("List Products", () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductsRepository()
    sut = new ListProductsBySellerService(inMemoryProductRepository)
  })

  it('should list 2 products', async () => {
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

    expect(products.products).toHaveLength(2)
    expect(products.totalPages).toEqual(1)
    expect(products.products).toEqual([
      expect.objectContaining({ id: 'product-01' }),
      expect.objectContaining({ id: 'product-02' }),
    ])
  })
  it('should list paginate products', async () => {
    for (let i = 0; i < 15; i++) {
      inMemoryProductRepository.create({
        id: `product-${i}`,
        name: "New Product",
        description: "Product description",
        price: "120,00",
        stock: 10,
        user_id: "user-1",
      })
    }

    const { products } = await sut.execute({
      userId: 'user-1',
      page: 1
    })

    expect(products.products).toHaveLength(5)
    expect(products.totalPages).toEqual(3)
    expect(products.products).toEqual([
      expect.objectContaining({ id: "product-0",}),
      expect.objectContaining({ id: "product-1",}),
      expect.objectContaining({ id: "product-2",}),
      expect.objectContaining({ id: "product-3",}),
      expect.objectContaining({ id: "product-4",}),
    ])
  })

})
