import { InMemoryProductsRepository } from "test/repositories/in-memory-products-repository";
import { GetProductByNameForSellerService } from "./get-product-by-name-for-seller";


let inMemoryProductRepository: InMemoryProductsRepository
let sut: GetProductByNameForSellerService

describe("Get Product by name for seller", () => {
  beforeEach(() => {
    inMemoryProductRepository = new InMemoryProductsRepository()
    sut = new GetProductByNameForSellerService(inMemoryProductRepository)
  })

  it('should get product by name for seller', async () => {
    for (let i = 1; i < 15; i++) {
      inMemoryProductRepository.create({
        id: `product-${i}`,
        name: `Product ${i}`,
        description: "Product description",
        price: "120,00",
        stock: 10,
        user_id: "user-1",
      })
    }
    const {products} = await sut.execute({
      productName: 'Product 1',
      user_id: "user-1",
      page: 1
    })
    
    expect(products.products).toHaveLength(1)
    expect(products.totalPages).toEqual(1)
    expect(products.products).toEqual([
      expect.objectContaining({ 
        id: "product-1",
        name: 'Product 1'
      }),
    ])
  })
})
