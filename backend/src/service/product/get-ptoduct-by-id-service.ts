import { Either, left, right } from "@/core/either";
import { ProductNotFoundError } from "@/core/errors/Errors/not-product-found";
import { ProductsRepository } from "@/repositories/product-repository";
import { Product } from "@prisma/client";

interface GetProductServiceRequest {
  product_id: string
}

type GetProductServiceResponse = Either<
  ProductNotFoundError,
  {
    product: Product
  }
>

export class GetProductService {
  constructor(
    private productsRepository: ProductsRepository,
  ) { }

  async execute({
    product_id, 
   }: GetProductServiceRequest): Promise<GetProductServiceResponse> {
    const product = await this.productsRepository.findById(product_id)

    if (!product) {
      return left(new ProductNotFoundError())
    }
    
    return right({
      product
    })
  }
}