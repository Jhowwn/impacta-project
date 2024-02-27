import { Either, right } from "@/core/either";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { ProductsRepository } from "@/repositories/product-repository";
import { Product } from "../entities/product";
import { ProductAttachment } from "../entities/product-attachment";
import { ProductAttachmentList } from "../entities/product-attachment-list";

interface ProductUseCaseRequest {
  name: string,
  description: string,
  price: string,
  stock: number,
  user_id: string,
  attachmentsIds: string[],
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
    attachmentsIds,
  }: ProductUseCaseRequest): Promise<ProductUseCaseResponse> {
    const product = Product.create({
      name,
      description,
      price,
      stock,
      userId: new UniqueEntityID(user_id),
    }) 

    const productAttachments = attachmentsIds.map((attachmentId) => {
      return ProductAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        productId: product.id,
      })
    })

    product.attachments = new ProductAttachmentList(productAttachments)

    await this.productsRepository.create(product)

    return right({
      product,
    })
  }
}