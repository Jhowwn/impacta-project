import { Either, left, right } from "@/core/either";
import { ProductNotFoundError } from "@/core/errors/Errors/not-product-found";
import { ProductAttachmentsRepository } from "@/repositories/product-attachments-repository";
import { ProductsRepository } from "@/repositories/product-repository";

interface DeleteProductServiceRequest {
  product_id: string
}

type DeleteProductServiceResponse = Either<
  ProductNotFoundError,
  null
>

export class DeleteProductService {
  constructor(
    private productsRepository: ProductsRepository,
    private productAttachmentsRepository: ProductAttachmentsRepository
  ) { }

  async execute({
    product_id, 
   }: DeleteProductServiceRequest): Promise<DeleteProductServiceResponse> {
    const product = await this.productsRepository.findById(product_id)

    if (!product) {
      return left(new ProductNotFoundError())
    }

    await this.productAttachmentsRepository.delete(product.id)
    await this.productsRepository.delete(product.id)

    return right(null)
  }
}
