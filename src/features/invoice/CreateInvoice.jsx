import { AddCircle, Cancel } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { FieldArray, FormikProvider, useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import Button from "../../components/Button";
import MainLayout from "../../components/MainLayout"; // Assuming MainLayout is your layout component
import { INITIAL, LOADED, LOADING } from "../../helpers/constants";
import AddCustomer from "./AddCustomer";
import AddProduct from "./AddProduct";
import DownloadModal from "./DownloadModal";
import RecentInvoices from "./RecentInvoiceList";
import useInvoice from "./useInvoice";

const validationSchema = Yup.object().shape({
  invoiceDate: Yup.date().required("Invoice date is required"),
  invoiceNumber: Yup.string().required("Invoice number is required"),
  customerId: Yup.number().required("Customer is required"),
  gstPercentage: Yup.number()
    .required("GST percentage is required")
    .min(0, "GST percentage must be non-negative"),
  products: Yup.array().of(
    Yup.object().shape({
      productId: Yup.number().required("Product is required"),
      qty: Yup.number()
        .min(1, "Quantity must be at least 1")
        .required("Quantity is required"),
      price: Yup.number()
        .min(0, "Price must be non-negative")
        .required("Price is required"),
    })
  ),
});

const CreateInvoice = () => {
  const {
    handleAddInvoice,
    storeState,
    getInvoices,
    invoices,
    invoiceState,
    customersList,
    fetchCustomers,
    fetchProducts,
    productsList,
    submitState,
    resetSubmitState
  } = useInvoice();
  const today = new Date().toISOString().split("T")[0];
  const [open, setOpen] = React.useState(false);
  const [customerDialogOpen, setCustomerDialogOpen] = React.useState(false);
  const [productDialogOpen, setProductDialogOpen] = React.useState(false);

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  const formik = useFormik({
    initialValues: {
      invoiceDate: today,
      invoiceNumber: "",
      customerId: "",
      gstPercentage: "",
      products: [{ productId: "", qty: 1, price: 0 }],
    },
    validationSchema,
    onSubmit: (values) => {
      handleAddInvoice(values);
    },
  });
  useEffect(() => {
    if (invoiceState === INITIAL) {
      getInvoices();
    }
    if (submitState === LOADED) {
      setOpen(true);
      resetSubmitState();
    }
  }, [invoiceState, submitState]);

  const { values, errors, touched, handleChange, handleSubmit } = formik;
  const rightComponent = (
    <Grid container maxWidth={"100%"} spacing={2}>
      <Grid item container xs={7}>
        <Card variant="outlined">
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Typography variant="h5" mb={4}>
                Create Invoice
              </Typography>
              <Grid container spacing={4} maxWidth={"700px"}>
                <Grid item xs={6}>
                  <TextField
                    label="Invoice Date"
                    type="date"
                    name="invoiceDate"
                    fullWidth
                    value={values.invoiceDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    error={touched.invoiceDate && Boolean(errors.invoiceDate)}
                    helperText={touched.invoiceDate && errors.invoiceDate}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Invoice Number"
                    name="invoiceNumber"
                    fullWidth
                    value={values.invoiceNumber}
                    onChange={handleChange}
                    error={
                      touched.invoiceNumber && Boolean(errors.invoiceNumber)
                    }
                    helperText={touched.invoiceNumber && errors.invoiceNumber}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    select
                    label="Customer"
                    name="customerId"
                    fullWidth
                    value={values.customerId || ""}
                    onChange={handleChange}
                    error={touched.customerId && Boolean(errors.customerId)}
                    helperText={touched.customerId && errors.customerId}
                  >
                    {customersList?.map((customer) => (
                      <MenuItem key={customer.id} value={customer.id}>
                        {customer.customerName}
                      </MenuItem>
                    ))}

                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setCustomerDialogOpen(true)}
                    >
                      Add new customer
                    </Button>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    select
                    label="GST Percentage"
                    name="gstPercentage"
                    fullWidth
                    value={values.gstPercentage}
                    onChange={handleChange}
                    error={
                      touched.gstPercentage && Boolean(errors.gstPercentage)
                    }
                    helperText={touched.gstPercentage && errors.gstPercentage}
                  >
                    <MenuItem value={5}>5%</MenuItem>
                    <MenuItem value={12}>12%</MenuItem>
                    <MenuItem value={18}>18%</MenuItem>
                    <MenuItem value={28}>28%</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Products
                  </Typography>
                  <FormikProvider value={formik}>
                    <FieldArray
                      name="products"
                      render={(arrayHelpers) => (
                        <div>
                          {formik.values.products?.map((product, index) => (
                            <Grid
                              container
                              spacing={2}
                              my={1}
                              key={index}
                              alignItems="center"
                            >
                              <Grid item xs={5}>
                                <TextField
                                  select
                                  label="Product"
                                  name={`products[${index}].productId`} // Changed product to productId
                                  fullWidth
                                  value={product.productId || ""}
                                  onChange={formik.handleChange}
                                  error={Boolean(
                                    formik.errors.products?.[index]?.productId
                                  )}
                                  helperText={
                                    formik.errors.products?.[index]?.productId
                                  }
                                >
                                  {productsList?.map((product) => (
                                    <MenuItem
                                      key={product.id}
                                      value={product.id}
                                    >
                                      {product.productName}
                                    </MenuItem>
                                  ))}
                                  <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => setProductDialogOpen(true)}
                                  >
                                    Add new product
                                  </Button>
                                </TextField>
                              </Grid>
                              <Grid item xs={3}>
                                <TextField
                                  label="Quantity"
                                  type="number"
                                  name={`products[${index}].qty`}
                                  fullWidth
                                  value={product.qty}
                                  onChange={formik.handleChange}
                                  error={Boolean(
                                    formik.errors.products?.[index]?.qty
                                  )}
                                  helperText={
                                    formik.errors.products?.[index]?.qty
                                  }
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <TextField
                                  label="Price"
                                  type="number"
                                  name={`products[${index}].price`}
                                  fullWidth
                                  value={product.price}
                                  onChange={formik.handleChange}
                                  error={Boolean(
                                    formik.errors.products?.[index]?.price
                                  )}
                                  helperText={
                                    formik.errors.products?.[index]?.price
                                  }
                                />
                              </Grid>
                              <Grid item xs={1}>
                                <IconButton
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <Cancel color="error" />
                                </IconButton>
                              </Grid>
                            </Grid>
                          ))}
                          <Button
                            startIcon={<AddCircle />}
                            onClick={() =>
                              arrayHelpers.push({
                                product: "",
                                qty: 1,
                                price: 0,
                              })
                            }
                            mt={2}
                            color="primary"
                          >
                            Add Product
                          </Button>
                        </div>
                      )}
                    />
                  </FormikProvider>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    loading={submitState === LOADING}
                    fullWidth
                  >
                    Submit Invoice
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Grid item container xs={5}>
        <RecentInvoices invoices={invoices} />
      </Grid>
    </Grid>
  );

  return (
    <>
      <MainLayout rightComponent={rightComponent} />
      <DownloadModal
        open={open}
        onClose={() => setOpen(false)}
        invoiceId={invoices[invoices.length - 1]?.id}
      />
      <AddCustomer
        open={customerDialogOpen}
        handleClose={() => setCustomerDialogOpen(false)}
      />
      <AddProduct
        open={productDialogOpen}
        handleClose={() => setProductDialogOpen(false)}
      />
    </>
  );
};

export default CreateInvoice;
