'use client'

import { api } from '@/api/baseUrl'
import { formatMoney } from '@/utils/formatMoney/formatMoney'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Button, Pagination, TextField } from '@mui/material'
import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'
import styles from './listProducts.module.scss'

export interface IProduct {
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
  const [searchName, setSearchName] = useState<string>('')
  const [totalPages, setTotalPages] = useState<number>(0)
  const [page, setPage] = useState<number>(1)

  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      await api
        .get(`/fetch-products-by-seller?page=${page}`)
        .then((response) => {
          setListProduct(response.data.products)
          setTotalPages(response.data.totalPages)
          console.log(response.data.products.slice(0, 2))
        })
        .catch((error) => {
          console.log(error)
        })
    }

    fetchProducts()
  }, [page])

  const handleSearchProduct = async () => {
    try {
      setPage(1)
      if (!searchName) {
        await api
          .get(`/fetch-products-by-seller?page=${page}`)
          .then((response) => {
            setListProduct(response.data.products)
            setTotalPages(response.data.totalPages)
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        const response = await api.get(
          `fetch-products-by-name-seller/${searchName}`,
        )
        console.log(response.data)
        setListProduct(response.data.products)
        setTotalPages(response.data.totalPages)
      }
    } catch (error) {
      console.error('Erro ao buscar o produto:', error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <TextField
          id="name-field"
          type="text"
          label="Consultar seus produtos"
          sx={{
            width: '40%',
            marginLeft: '1rem',
            marginRight: '2rem',
          }}
          variant="standard"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{
            padding: '12px',
          }}
          onClick={handleSearchProduct}
        >
          <SearchIcon />
          Consultar
        </Button>
      </div>

      {listProduct.length === 0 ? (
        <div>
          <p>Produtos Não Encontrados</p>
        </div>
      ) : (
        <>
          <div className={styles.listProducts}>
            {listProduct.map((product) => (
              <div key={product.id} className={styles.listProduct}>
                <Link href={`edit-product/${product.id}`}>
                  <Box className={styles.image}>
                    <img
                      src={product.Attachment[0].url}
                      width="100%"
                      height="250px"
                      alt=""
                    />
                  </Box>

                  <Box className={styles.text}>
                    <h2 className={styles.name}>
                      <span>{product.name}</span>
                    </h2>
                    <Box className={styles.stock}>
                      <h4>Estoque:</h4>
                      <span>{product.stock}</span>
                    </Box>
                    <Box className={styles.stock}>
                      <h4>Produtos Vendidos:</h4>
                      <span>{product.products_sold}</span>
                    </Box>
                    <h1 className={styles.price}>
                      {formatMoney(Number(product.price))}
                    </h1>
                  </Box>
                </Link>
              </div>
            ))}
          </div>

          <Box className={styles.pagination}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              color="secondary"
            />
          </Box>
        </>
      )}
    </div>
  )
}
