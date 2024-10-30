import { IProducts, ProductsRepository } from "@/repositories/product-repository";
import { Prisma, Product } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []
  
  async findById(id: string): Promise<Product | null> {
    const product = this.items.find(item => item.id.toString() === id);
    
    if (!product) {
      return null;
    }
    
    return product
  }

  async findByUserId(userId: string, page: number): Promise<IProducts | null> {
    const take = 5
    const allProducts = this.items
    .filter((item) => item.user_id === userId)
    const productsPerPage = allProducts.slice((page - 1) * take, page * take)
    const totalPages = allProducts.length
    
    let products: IProducts = {
      products: [],
      totalPages: 0
    } 

    products.products = productsPerPage 
    products.totalPages = Math.ceil(totalPages / take)

    return products
  }
  
  async findByName(name: string): Promise<Product[] | null> {
    const product = this.items.filter(item => item.name === name);

    if (!product) {
      return null;
    }

    return product
  }

  async findByNameForSeller(name: string, id: string, page: number): Promise<IProducts | null> {
    const take = 5
    const allProducts = this.items.filter(item => item.name === name && item.user_id === id)
    const productsPerPage = allProducts.slice((page - 1 ) * take, page * take)
    const totalPages = allProducts.length
    
    let products: IProducts = {
      products: [],
      totalPages: 0
    } 

    products.products = productsPerPage 
    products.totalPages = Math.ceil(totalPages / take)

    if (!products) {
      return null;
    }

    return products
  }

  async create(data: Prisma.ProductUncheckedCreateInput): Promise<Product> {
    const product = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      products_sold: data.products_sold ?? 0,
      user_id: data.user_id,
      created_at: new Date(),
      updated_at: new Date() ?? null,
    };

    this.items.push(product)

    return product
  }

  async update(product: Product): Promise<Product> {
    const productIndex = this.items.findIndex(item => item.id === product.id)
    
    if (productIndex >= 0 ) {
      this.items[productIndex] = product
    }

    return product
  }

  async delete(productId: string): Promise<void> {
    const productIndex = this.items.findIndex(item => item.id === productId)
    
    this.items.splice(productIndex, 1)
  }
}
