/**
 * Make some property optional on type
 *
 * @example
 * ```typescript
 * type Product {
 *  id: string;
 *  name: string;
 *  description: string;
 * }
 *
 * Optional<Product, 'id' | 'name'>
 * ```
 **/

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
