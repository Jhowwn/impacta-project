import { ProductNotFoundError } from "@/core/errors/Errors/not-product-found";
import { IProducts, ProductsRepository } from "@/repositories/product-repository";

interface GetProductByNameForSellerServiceRequest {
  name: string,
  user_id: string,
  page: number;
}

type GetProductByNameForSellerServiceResponse = {
  products: IProducts
}

export class GetProductByNameForSellerService {
  constructor(
    private productsRepository: ProductsRepository,
  ) { }

  async execute({
    name,
    user_id,
    page
   }: GetProductByNameForSellerServiceRequest): Promise<GetProductByNameForSellerServiceResponse> {
    const products = await this.productsRepository.findByNameForSeller(name, user_id, page)

    if (!products) {
      throw new ProductNotFoundError()
    }
    
    return {
      products
    }
  }
}
