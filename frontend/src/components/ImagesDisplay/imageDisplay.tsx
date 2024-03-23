import { FileProps } from '@/app/product/page';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Grid, IconButton } from "@mui/material";
import Image from "next/image";

interface imagesDisplayProps {
  file: FileProps
  handleDeleteImage: (name: string) => void
}

export default function ImageDisplay({ file, handleDeleteImage }: imagesDisplayProps) {
  return (
    <Grid item xs={2} key={file.name} component="section" display='flex' flexDirection='column' flex='1' marginTop="2rem">
      <Image src={file.url} width={200} height={200} alt='' />
      <Box style={{ backgroundColor: "gray", color: "white", width: "200px", height: "25px", marginTop: "-24px", opacity: 0.8 }} flexDirection="row" textAlign="center">
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
  );
}
