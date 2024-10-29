import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  //item name
  name: Yup.string().required('Item name is required'),
  //item quantity
  remainingQty: Yup.number().required('Quantity is required').positive('Quantity must be a positive number'),
  //total qty
  totalQty: Yup.number().required('Quantity is required').positive('Quantity must be a positive number'),
});