import {
  DialogContentText,
  FormControl,
  FormLabel,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import useInvoice from "./useInvoice";
// import api from '../services/api'; // Adjust the path according to your project structure

const AddCustomer = ({ open, handleClose }) => {
  const {addCustomer} = useInvoice();
  // Validation schema for Formik
  const validationSchema = Yup.object({
    customerName: Yup.string().required("Customer name is required"),
    address: Yup.string().required("Address is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    gstNumber: Yup.string().required("GST number is required"),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      customerName: "",
      address: "",
      email: "",
      phone: "",
      gstNumber: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
        try {
          // Make API call to add customer
          addCustomer(values);
          resetForm();
          handleClose();
        } catch (error) {
          toast.error('Failed to add customer');
        }
    },
  });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: formik.handleSubmit,
        sx: { backgroundImage: "none", minWidth: "545px" },
      }}
    >
      <DialogTitle>Add new customer</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          Enter your customer details to add it to the list.
        </DialogContentText>
        <FormControl  >
          <FormLabel htmlFor="customerName">Customer Name</FormLabel>
          <TextField
            id="customerName"
            name="customerName"
            // label="Customer Name"
            placeholder="Customer Name"
            variant="outlined"
            value={formik.values.customerName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.customerName &&
              Boolean(formik.errors.customerName)
            }
            helperText={
              formik.touched.customerName && formik.errors.customerName
            }
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth >
          <FormLabel htmlFor="address">Address</FormLabel>

          <TextField
            id="address"
            name="address"
            // label="Address"
            placeholder="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.address &&
              Boolean(formik.errors.address)
            }
            helperText={
              formik.touched.address && formik.errors.address
            }
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth >
          <FormLabel htmlFor="email">Email</FormLabel>

          <TextField
            id="email"
            name="email"
            // label="Address"
            placeholder="abc@xyz.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.email &&
              Boolean(formik.errors.email)
            }
            helperText={
              formik.touched.email && formik.errors.email
            }
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth >
          <FormLabel htmlFor="phone">Phone</FormLabel>

          <TextField
            id="phone"
            name="phone"
            // label="Address"
            placeholder="1234567890"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phone &&
              Boolean(formik.errors.phone)
            }
            helperText={
              formik.touched.phone && formik.errors.phone
            }
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth >
          <FormLabel htmlFor="gstNumber">GST Number</FormLabel>

          <TextField
            id="gstNumber"
            name="gstNumber"
            // label="GST Number"
            placeholder="GST Number"
            value={formik.values.gstNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.gstNumber && Boolean(formik.errors.gstNumber)
            }
            helperText={
              formik.touched.gstNumber && formik.errors.gstNumber
            }
            fullWidth
          />
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCustomer;
