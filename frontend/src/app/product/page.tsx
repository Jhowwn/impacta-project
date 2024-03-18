"use client"

import { FormEvent, useState } from "react";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

import { Box, Button, Grid, IconButton, TextField } from "@mui/material";

import { api } from "@/api/baseUrl";
import Image from "next/image";
import styles from './product.module.scss';

interface FileProps {
  name: string;
  url: string;
  file: File
}

export default function CreateProduct() {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [stock, setStock] = useState<number>()

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
      setStock(undefined);
      setSelectedFiles([]);
      return alert('Produto criado com sucesso')
    } catch (err) {
      return alert('Não foi possivel criar seu produtp')
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}> Novo Produto</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Grid container spacing={2} marginBottom={'2rem'}>
          <Grid item xs={6}>
            <input
              type="text"
              placeholder='Nome do Produto'
              className={styles.input}
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <TextField
              id="standard-basic"
              type="text"
              fullWidth
              color="error"
              label="Nome do Produto"
              value={name}
              onChange={e => setName(e.target.value)}
              variant="standard" />
          </Grid>
          <Grid item xs={6}>
            <input
              type='text'
              placeholder='Descrição'
              className={styles.input}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <input
              type='text'
              placeholder='Preço'
              className={styles.input}
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <input
              type='number'
              placeholder='Estoque'
              className={styles.input}
              value={stock}
              onChange={e => setStock(e.target.valueAsNumber)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              disabled={selectedFiles.length > 2 ? true : false}
            >
              Adicionar imagem
              <input
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                multiple
              />
            </Button>
          </Grid>

          <Grid container>
            {selectedFiles.map((file, index) => (
              <Grid item xs={2} key={file.name}
                component="section"
                display='flex'
                flexDirection='column'
                flex='1'
                marginTop="2rem"
              >
                <Image src={file.url} width={200} height={200} alt='' />
                <Box style={{
                  backgroundColor: "gray",
                  color: "white",
                  width: "200px",
                  height: "25px",
                  marginTop: "-24px",
                  opacity: 0.8
                }}
                  flex-direction="row"
                  textAlign="center"
                >
                  <IconButton
                    onClick={() => handleDeleteImage(file.name)}
                    sx={{ p: 0, borderRadius: '1px' }}
                    aria-label="delete"
                    style={{ opacity: 1.0 }}
                  >
                    <DeleteIcon style={{ color: 'white' }} />
                  </IconButton>
                </Box>
              </Grid>
            ))
            }
          </Grid>
        </Grid>

        <Button variant="contained" color="secondary" type="submit">Confirmar</Button>
      </form>
    </main>
  )
}
