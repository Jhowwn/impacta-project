"use client"

import { FormEvent, useState } from "react";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

import { Box, Button, IconButton } from "@mui/material";

import { api } from "@/api/baseUrl";
import styles from './product.module.css';

interface FileProps {
  name: string;
}

export function NewProduct() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState<number>()

  const [selectedFiles, setSelectedFiles] = useState<FileProps[]>([]);

  const handleFileChange = (event: any) => {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(event.target.files[0].type)) {
      return alert('Invalid file type: ' + event.target.files[0].type)
    }

    if (selectedFiles.length > 2) {
      return alert('Multiple files selected: ')
    }

    if (selectedFiles.includes(event.target.files[0].name)) {
      return alert('File already selected')
    }

    setSelectedFiles([...selectedFiles, ...event.target.files]);
  };

  const handleDeleteImage = (name: string) => {
    const files = selectedFiles.filter(file => file.name !== name)

    setSelectedFiles(files)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const token = localStorage.getItem("token")

    const data = {
      name,
      description,
      price,
      stock
    }

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

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('attachment', file.name);
    });

    await api.post('products', data, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(async response => {
      await api.post(`produ ct/${response.data.id}/attachment`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
    })
      .catch(error => {
        console.error('Erro ao enviar os arquivos:', error);
      });
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>Novo Produto</h1>
      <input
        type="text"
        placeholder='Nome do Produto'
        className={styles.input}
        value={name}
        onChange={e => setName(e.target.value)}
      />

      {/* <TextField
        error={!name ? true :  false}
        id="outlined-required"
        label={name ? false : "Nome do Produto"}
        defaultValue={name}
        helperText={name ? false :  true}
        variant="standard"
      /> */}
      <input
        type='text'
        placeholder='Descrição'
        className={styles.input}
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type='text'
        placeholder='Preço'
        className={styles.input}
        value={price}
        onChange={e => setPrice(e.target.value)}
      />
      <input
        type='number'
        placeholder='Estoque'
        className={styles.input}
        value={stock}
        onChange={e => setStock(e.target.valueAsNumber)}
      />

      <Button variant="contained" color="secondary" type="submit">Confirmar</Button>

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
      {selectedFiles.map(file => (
        <Box key={file.name}
          component="section"
          sx={{ p: 2, border: '1px dashed red' }}
          display='flex'
          flexDirection='row'
          flex='1'
          p={2}
          alignItems='center'
          justifyContent='space-between'
        >
          <p>
            {file.name}
          </p>
          <IconButton
            onClick={() => handleDeleteImage(file.name)}
            size='small'
            style={{ color: "white" }} sx={{ p: 0, borderRadius: '1px' }}
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))
      }
    </form>
  )
}
