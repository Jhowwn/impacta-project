import { formatMoney } from '@/utils/formatMoney/formatMoney';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Grid, TextField } from "@mui/material";

interface ProductFormProps {
  name: string
  setName: (name: string) => void
  description: string
  setDescription: (description: string) => void
  price: string
  setPrice: (price: string) => void
  stock: number
  setStock: (stock: number) => void
  handleFileChange: (event: any) => void
}

export default function ProductForm({
  name,
  setName,
  description,
  setDescription,
  price,
  setPrice,
  stock,
  setStock,
  handleFileChange,
}: ProductFormProps) {

  return (
    <>
      <Grid container spacing={2} marginBottom={'2rem'}>
        <Grid item xs={6}>
          <TextField
            id="name-field"
            type="text"
            fullWidth
            color="error"
            label="Nome do Produto"
            value={name}
            onChange={e => setName(e.target.value)}
            variant="standard"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="description-field"
            type="text"
            fullWidth
            color="error"
            label="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
            variant="standard"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="price-field"
            type="text"
            fullWidth
            color="error"
            label="Preço"
            value={formatMoney(Number(price))}
            onChange={e => {
              const rawValue = e.target.value.replace(/\D/g, '');
              setPrice((Number(rawValue) / 100).toString());
            }}
            variant="standard"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="stock-field"
            type="number"
            fullWidth
            color="error"
            label="Estoque"
            value={stock}
            onChange={e => setStock(parseInt(e.target.value))}
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            component="label"
            color='success'
            variant="contained"
            startIcon={<CloudUploadIcon />}
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
      </Grid>
    </>
  );
}
