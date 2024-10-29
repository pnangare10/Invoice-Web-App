import toastBannerReducer from './../features/toastBanner/toastBannerSlice';
import invoiceReducer from '../features/invoice/invoiceSlice';

export default {
  invoices: invoiceReducer,
  toastBanner: toastBannerReducer,
};