'use client'

import { api } from '@/api/baseUrl'
import { FileProps } from '@/app/product/page'
import Alert from '@/components/Alert/Alert'
import ImageDisplay from '@/components/ImagesDisplay/imageDisplay'
import ProductForm from '@/components/ProductForm/ProductForm'
import { Button, Grid } from '@mui/material'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import styles from './product.module.scss'

export interface IProduct {
  Attachment: {
    id: string
    url: string
    name: string
  }[]
  id: string
  name: string
  description: string
  price: string
  stock: number
}

export default function UpdateProduct({
  params,
}: {
  params: { productId: string }
}) {
  const router = useRouter()

  const [product, setProduct] = useState<IProduct>()
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [stock, setStock] = useState<number>(0)
  const [selectedFiles, setSelectedFiles] = useState<FileProps[]>([])

  const [alertText, setAlertText] = useState<string>('')
  const [alertTitle, setAlertTitle] = useState<string>('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const getProduct = async () => {
      await api
        .get(`/product/${params.productId}`)
        .then((response) => {
          setProduct(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    getProduct()
  }, [params.productId])

  useEffect(() => {
    if (product) {
      setName(product.name)
      setDescription(product.description)
      setPrice(product.price)
      setStock(product.stock)

      if (product.Attachment.length > 0) {
        for (const file of product.Attachment) {
          file.name = file.id
          console.log(file)
        }
        setSelectedFiles(product.Attachment)
      }
    }
  }, [product])

  const handleClickOpen = (title: string, text: string) => {
    setOpen(true)
    setAlertTitle(title)
    setAlertText(text)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleFileChange = (event: any) => {
    if (!event.target.files) return alert('No files selected')

    for (const file of event.target.files) {
      if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(file.type)) {
        return handleClickOpen(
          'Arquivo inválido',
          'Tipo de arquivo inválido: Permitidos jpeg/pnj/jpg',
        )
      }

      if (selectedFiles.length + event.target.files.length > 3) {
        return handleClickOpen(
          'Multiplas arquivos selecionados',
          'Arquivos acima do permitido: 3',
        )
      }

      if (selectedFiles.includes(file.name)) {
        return handleClickOpen(
          'Arquivos repetido',
          'Este arquivo já foi selecionado!',
        )
      }

      file.url = URL.createObjectURL(file)
      file.file = file
    }
    setSelectedFiles([...selectedFiles, ...event.target.files])
  }

  const handleDeleteImage = (name: string) => {
    const files = selectedFiles.filter((file) => file.name !== name)

    setSelectedFiles(files)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!name) {
      return handleClickOpen('Nome do Produto', 'Nome do produto é obrigátorio')
    }

    if (!description) {
      return handleClickOpen(
        'Descrição do Produto',
        'Descrição do produto é obrigátorio',
      )
    }

    if (!price) {
      return handleClickOpen(
        'Preço do Produto',
        'Preço do produto é obrigátorio',
      )
    }

    if (!stock) {
      return handleClickOpen(
        'Estoque do Produto',
        'Estoque do produto é obrigátorio',
      )
    }

    const data = {
      name,
      description,
      price,
      stock,
    }

    const formData = new FormData()
    selectedFiles.forEach((file: any) => {
      formData.append('attachment', file)
    })

    try {
      await api.put(`product/${product?.id}`, data, {
        headers: {
          'Content-type': 'application/json',
        },
      })
      // .then(async (response) => {
      //   await api
      //     .post(`product/${response.data.id}/attachment`, formData, {
      //       headers: {
      //         'Content-Type': 'multipart/form-data',
      //       },
      //     })
      //     .then((response) => {
      //       console.log(response)
      //     })
      // })
      // .catch((error) => {
      //   console.error('Erro ao enviar os arquivos:', error)
      // })

      handleClickOpen('Sucesso', 'Produto alterado com sucesso')
      router.push('/listProducts')
    } catch (err) {
      return handleClickOpen('Erro', 'Não foi possivel alterar seu produtp')
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Editar Produto</h1>
      <Alert
        open={open}
        close={handleClose}
        title={alertTitle}
        text={alertText}
      />
      <form onSubmit={handleSubmit} className={styles.form}>
        <ProductForm
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          price={price}
          setPrice={setPrice}
          stock={stock}
          setStock={setStock}
          handleFileChange={handleFileChange}
          selectedFiles={selectedFiles}
        />
        <Grid container spacing={2} marginBottom={'2rem'}>
          <Grid container>
            {selectedFiles.map((file, index) => (
              <ImageDisplay
                key={file.name}
                file={file}
                handleDeleteImage={handleDeleteImage}
              />
            ))}
          </Grid>
        </Grid>

        <Button variant="contained" color="success" type="submit">
          Confirmar
        </Button>
      </form>
    </main>
  )
}
