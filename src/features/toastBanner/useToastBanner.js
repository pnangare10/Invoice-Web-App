import { CheckCircle, Error, Info, Warning } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { hideToastBanner } from "./toastBannerSlice";
const useToastBanner = () => {
  const dispatch = useDispatch();
  const { showToast, title, message, type } = useSelector((state) => state.toastBanner);

  let ToastIcon = CheckCircle;

  const handleCloseToast = () => {
    dispatch(hideToastBanner());
  };

  const getToastIcon = (type) => {
    switch (type) {
      case "info":
        ToastIcon = Info;
        break;
      case "warning":
        ToastIcon = Warning;
        break;
      case "error":
        ToastIcon = Error;
        break;
      default:
        ToastIcon = CheckCircle;
        break;
    }
  };

  if(type) {
    getToastIcon();
  }

  return {
    showToast,
    title,
    message,
    type,
    ToastIcon,
    handleCloseToast,
  }
};

export default useToastBanner;
