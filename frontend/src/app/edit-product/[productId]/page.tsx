'use client'

import { api } from '@/api/baseUrl'
import { FileProps } from '@/app/product/page'
import MyAlert, { MessageType } from '@/components/Alert/Alert'
import ConfirmModal from '@/components/ConfirmModal'
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
  const [typeAlert, setTypeAlert] = useState<MessageType>('warning')

  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  )
  const [showConfirmationMessage, setShowConfirmationMessage] =
    useState<boolean>(false)

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
        }
        setSelectedFiles(product.Attachment)
      }
    }
  }, [product])

  const handleClickOpen = (type: MessageType, text: string) => {
    setShowConfirmationMessage(true)
    setTypeAlert(type)
    setAlertText(text)
  }

  const handleFileChange = (event: any) => {
    if (!event.target.files) return alert('No files selected')

    for (const file of event.target.files) {
      if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(file.type)) {
        return handleClickOpen(
          'error',
          'Tipo de arquivo inválido: Permitidos jpeg/pnj/jpg',
        )
      }

      if (selectedFiles.length + event.target.files.length > 3) {
        return handleClickOpen('error', 'Arquivos acima do permitido: 3')
      }

      if (selectedFiles.includes(file.name)) {
        return handleClickOpen('error', 'Este arquivo já foi selecionado!')
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
      return handleClickOpen('error', 'Nome do produto é obrigátorio')
    }

    if (!description) {
      return handleClickOpen('error', 'Descrição do produto é obrigátorio')
    }

    if (!price) {
      return handleClickOpen('error', 'Preço do produto é obrigátorio')
    }

    if (!stock) {
      return handleClickOpen('error', 'Estoque do produto é obrigátorio')
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

    if (!product) {
      return handleClickOpen(
        'error',
        'Entre em contato com: cdxjcmsdjv@gmail.com',
      )
    }

    try {
      await api
        .put(`product/${product.id}`, data, {
          headers: {
            'Content-type': 'application/json',
          },
        })
        .catch((error) => {
          console.error('Erro ao atualizar produto: ', error)
        })
      await api
        .post(`product/${product.id}/attachment`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .catch((error) => {
          console.error('Erro ao enviar os arquivos: ', error)
        })

      handleClickOpen('success', 'Produto alterado com sucesso')
      router.push('/listProducts')
    } catch (err) {
      return handleClickOpen('error', 'Não foi possivel alterar seu produto')
    }
  }

  const handleDeleteProduct = (productId: string) => {
    setSelectedProductId(productId)
    setOpenConfirmModal(true)
  }

  const handleConfirmDelete = async () => {
    if (selectedProductId) {
      try {
        await api.delete(`/product/${selectedProductId}`, {
          headers: {
            'Content-type': 'application/json',
          },
        })
        setShowConfirmationMessage(true)
      } catch (error) {
        console.error('Erro ao excluir o produto:', error)
      } finally {
        setOpenConfirmModal(false)
        setSelectedProductId(null)
      }
      handleClickOpen('success', 'Produto excluido com sucesso')
      router.push('/listProducts')
    }
  }

  const handleCloseModal = () => {
    setOpenConfirmModal(false)
    setSelectedProductId(null)
  }

  const handleCloseSnackbar = () => {
    setShowConfirmationMessage(false)
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Editar Produto</h1>
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
          <Grid container gap={2}>
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
          Salvar
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={() => handleDeleteProduct(product.id)}
        >
          Excluir
        </Button>
      </form>
      <ConfirmModal
        open={openConfirmModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        description="Você tem certeza que deseja excluir este produto?"
      />

      <MyAlert
        open={showConfirmationMessage}
        close={handleCloseSnackbar}
        text={alertText}
        type={typeAlert}
      />
    </main>
  )
}
