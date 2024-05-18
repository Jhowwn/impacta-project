import { Alert, Snackbar } from '@mui/material'

export type MessageType = 'success' | 'error' | 'warning' | 'info'
interface AlertProps {
  open: boolean
  close: () => void
  type: MessageType
  text: string
}

export default function MyAlert({ open, close, type, text }: AlertProps) {
  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={close}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={close} severity={type} sx={{ width: '100%' }}>
          {text}
        </Alert>
      </Snackbar>
    </>
  )
}
