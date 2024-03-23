'use client'

import { api } from '@/api/baseUrl';
import { useEffect, useState } from 'react';
import styles from './listProducts.module.scss';

interface IProduct {
  Attachment: {
    id: string
    url: string
  }[]
  id: string
  name: string
  description: string
  price: string
  stock: number
  created_at: string
  updated_at: string
}

export default function ListProducts() {
  const [listProduct, setListProduct] = useState<IProduct[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      await api.get('/fetch-products-by-seller').then((response) => {
        setListProduct(response.data)
      }).catch((error) => {
        console.log(error)
      })
    }

    fetchProducts()
  }, [])

  console.log(listProduct.map(product => product.Attachment[0].url[0]))
  return (
    <div className={styles.container}>
      {
        listProduct.map((product) => (
          <div key={product.id}>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.stock}</p>
            <p>{product.created_at}</p>
            {
              product.Attachment.map(attachment => (
                <img key={attachment.id} src={attachment.url} width={200} height={200} alt='' />
                ))
              }
          </div>
        ))
      }
    </div>
  )
}