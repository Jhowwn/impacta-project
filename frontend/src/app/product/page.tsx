"use client"

import { FormEvent, useState } from "react";


import { Button, Grid } from "@mui/material";

import { api } from "@/api/baseUrl";
import ImageDisplay from "@/components/ImagesDisplay/imageDisplay";
import ProductForm from "@/components/ProductForm/ProductForm";
import styles from './product.module.scss';

export interface FileProps {
  name: string;
  url: string;
  file: File
}

export default function CreateProduct() {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [stock, setStock] = useState<number>(0)

  const [selectedFiles, setSelectedFiles] = useState<FileProps[]>([]);

  const handleFileChange = (event: any) => {
    if (!event.target.files) return alert('No files selected')

    for (const file of event.target.files) {
      if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(file.type)) {
        return alert('Invalid file type: ' + file.type)
      }

      if (selectedFiles.length + event.target.files.length > 3) {
        return alert('Multiple files selected: ')
      }

      if (selectedFiles.includes(file.name)) {
        return alert('File already selected')
      }

      file.url = URL.createObjectURL(file)
      file.file = file
    }
    setSelectedFiles([...selectedFiles, ...event.target.files]);
  };

  const handleDeleteImage = (name: string) => {
    const files = selectedFiles.filter(file => file.name !== name)

    setSelectedFiles(files)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!name) {
      return alert('Nome do produto é obrigátorio')
    }

    if (!description) {
      return alert('Descrição do produto é obrigátorio')
    }

    if (!price) {
      return alert('Preço do produto é obrigátorio')
    }

    if (!stock) {
      return alert('Estoque do produto é obrigátorio')
    }

    const data = {
      name,
      description,
      price,
      stock
    }

    const formData = new FormData();
    selectedFiles.forEach((file: any) => {
      formData.append('attachment', file);
    });

    try {


      await api.post('products', data, {
        headers: {
          'Content-type': 'application/json',
        }
      }).then(async response => {
        await api.post(`product/${response.data.id}/attachment`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }).then(response => {
          console.log(response)
        })
      })
        .catch(error => {
          console.error('Erro ao enviar os arquivos:', error);
        });


      setName('');
      setDescription('');
      setPrice('');
      setStock(0);
      setSelectedFiles([]);
      return alert('Produto criado com sucesso')
    } catch (err) {
      return alert('Não foi possivel criar seu produtp')
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title} >Novo Produto</h1>
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
      />
        <Grid container spacing={2} marginBottom={'2rem'}>
          <Grid container>
            {selectedFiles.map((file, index) => (
              <ImageDisplay key={file.name} file={file} handleDeleteImage={handleDeleteImage} />
            ))}
          </Grid>
        </Grid>

        <Button variant="contained" color="success" type="submit">Confirmar</Button>
      </form>
    </main>
  )
}