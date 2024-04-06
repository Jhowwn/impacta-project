'use client'

import { api } from '@/api/baseUrl';
import { Box } from '@mui/material';
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
  products_sold: number
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

  console.log(listProduct)

  return (
    <div className={styles.container}>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {
          listProduct.map((product) => (
            <Box
              key={product.id}
              className={styles.listProduct}
            >
              <Box className={styles.image}>
                <img src={product.Attachment[0].url} width={'100%'} height={'100%'} alt='' />
              </Box>

              <Box className={styles.text}>
                <Box className={styles.price}>
                  <h2><span>{product.name}</span></h2>
                </Box>
                <Box className={styles.price}>
                  <h4>Descrição:</h4>
                  <span>{product.description}</span>
                </Box>
                <Box className={styles.price}>
                  <h4>Estoque:</h4>
                  <span>{product.stock}</span>
                </Box>
                <Box className={styles.price}>
                  <h4>Produtos Vendidos:</h4>
                  <span>{product.products_sold}</span>
                </Box>
                <Box className={styles.price}>
                  <span>R$:</span>
                  <h1>{product.price}</h1>
                </Box>
              </Box>
            </Box>
          ))
        }
      </Box>
    </div >
  )
}
