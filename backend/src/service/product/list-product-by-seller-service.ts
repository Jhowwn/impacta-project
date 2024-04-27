import { ProductNotFoundError } from "@/core/errors/Errors/not-product-found";
import { IProducts, ProductsRepository } from "@/repositories/product-repository";

interface ProductServiceRequest {
  userId: string;
  page: number;
}

type ProductServiceResponse = {
  products: IProducts
}

export class ListProductsBySellerService {
  constructor(
    private productsRepository: ProductsRepository
  ) { }

  async execute({ userId, page }: ProductServiceRequest): Promise<ProductServiceResponse> {

    const products = await this.productsRepository.findByUserId(
      userId,
      page
    );

    if (!products) {
      throw new ProductNotFoundError()
    }

    return {
      products
    }
  }
}
