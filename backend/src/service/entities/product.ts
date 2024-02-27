import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";
import { ProductAttachmentList } from "./product-attachment-list";

export interface ProductProps {
  name: string
  description: string
  price: string
  stock: number
  userId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date | null
  attachments: ProductAttachmentList
}

export class Product extends Entity<ProductProps> {
  get userId() {
    return this.props.userId
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  get price() {
    return this.props.price
  }

  set price(price: string) {
    this.props.price = price
    this.touch()
  }

  get stock() {
    return this.props.stock
  }

  set stock(stock: number) {
    this.props.stock = stock
    this.touch()
  }

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: ProductAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<ProductProps, 'createdAt' | 'attachments'>,
    id?: UniqueEntityID
  ) {
    const product = new Product({
      ...props,
      attachments: props.attachments ?? new ProductAttachmentList(),
      createdAt: props.createdAt || new Date()
    },
      id
    )

    return product
  }
}