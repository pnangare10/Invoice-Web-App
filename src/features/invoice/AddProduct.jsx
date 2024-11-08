import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import useInvoice from './useInvoice';

export default function AddProduct({ open, handleClose }) {
  const {addProduct} = useInvoice();
  // Form validation schema
  const validationSchema = Yup.object({
    productName: Yup.string().required('Product name is required'),
    productPrice: Yup.number().required('Product price is required').min(0, 'Price must be greater than or equal to 0'),
    gstPercentage: Yup.number().required('GST percentage is required').min(0, 'GST must be at least 0').max(100, 'GST cannot exceed 100'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      productName: '',
      productPrice: '',
      gstPercentage: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        addProduct(values);
        resetForm();
        handleClose();
      } catch (error) {
        toast.error('Failed to add product');
      }
    },
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <FormControl fullWidth>
            <TextField
              id="productName"
              name="productName"
              label="Product Name"
              placeholder="Enter product name"
              value={formik.values.productName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.productName && Boolean(formik.errors.productName)}
              helperText={formik.touched.productName && formik.errors.productName}
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="productPrice"
              name="productPrice"
              label="Product Price"
              placeholder="Enter product price"
              type="number"
              value={formik.values.productPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.productPrice && Boolean(formik.errors.productPrice)}
              helperText={formik.touched.productPrice && formik.errors.productPrice}
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="gstPercentage"
              name="gstPercentage"
              label="GST Percentage"
              placeholder="Enter GST percentage"
              type="number"
              value={formik.values.gstPercentage}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.gstPercentage && Boolean(formik.errors.gstPercentage)}
              helperText={formik.touched.gstPercentage && formik.errors.gstPercentage}
              fullWidth
            />
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ pb: 3, px: 3 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit">Add Product</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
