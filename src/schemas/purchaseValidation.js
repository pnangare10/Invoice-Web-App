import * as Yup from 'yup';

const purchaseValidationSchema = Yup.object().shape({
  item: Yup.string().required('Item is required'),
  qty: Yup.number().required('Quantity is required').positive('Quantity must be a positive number'),
  amount: Yup.number().required('Amount is required').positive('Amount must be a positive number'),
  date: Yup.date().required('Date is required'),
});

export default purchaseValidationSchema;
