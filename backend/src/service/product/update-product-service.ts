import { Either, left, right } from "@/core/either";
import { NotAllowedError } from "@/core/errors/Errors/not-allowed-error";
import { ProductsRepository } from "@/repositories/product-repository";
import { Product } from "@prisma/client";

interface ProductUseCaseRequest {
  product_id: string
  name: string,
  description: string,
  price: string,
  stock: number,
  user_id: string,
}

type ProductUseCaseResponse = Either<
  NotAllowedError,
  {
    product: Product
  }
>

export class UpdateProductService {
  constructor(
    private productsRepository: ProductsRepository,
  ) { }

  async execute({
    product_id,
    name,
    description,
    price,
    stock,
    user_id
  }: ProductUseCaseRequest): Promise<ProductUseCaseResponse> {
    const findProduct = await this.productsRepository.findById(product_id)

    if (!findProduct) {
      return left(new NotAllowedError())
    }

    if(findProduct.user_id !== user_id) {
      return left(new NotAllowedError())
    }

    findProduct.name = name
    findProduct.description = description
    findProduct.price = price
    findProduct.stock = stock

    const product = await this.productsRepository.update(findProduct)

    return right({
      product
    })
  }
}