import { Either, right } from "@/core/either";
import { ProductsRepository } from "@/repositories/product-repository";
import { Product } from "@prisma/client";

interface ProductUseCaseRequest {
  name: string,
  description: string,
  price: string,
  stock: number,
  user_id: string,
}

type ProductUseCaseResponse = Either<
  null,
  {
    product: Product
  }
>

export class CreateProductService {
  constructor(
    private productsRepository: ProductsRepository,
  ) { }

  async execute({
    name,
    description,
    price,
    stock,
    user_id,
  }: ProductUseCaseRequest): Promise<ProductUseCaseResponse> {
    const product = await this.productsRepository.create({
      name,
      description,
      price,
      stock,
      user_id,
    })

    return right({
      product,
    })
  }
}