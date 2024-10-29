import { Alert, AlertTitle, Snackbar } from "@mui/material";
import useToastBanner from "./useToastBanner";

export default function ToastBanner() {
  const {showToast, title, message, type, ToastIcon, handleCloseToast} = useToastBanner();

  return (
    <Snackbar open = {showToast} autoHideDuration={5000} onClose={handleCloseToast} anchorOrigin={{vertical:"top", horizontal:"center"}}>
      <Alert severity={type} icon={<ToastIcon />} variant="filled" sx={{
        alignItems:"center",
        borderRadius:1,
      }}>
        {title ? <AlertTitle>{title}</AlertTitle> : null}
        {message}
      </Alert>
    </Snackbar>
  )
}