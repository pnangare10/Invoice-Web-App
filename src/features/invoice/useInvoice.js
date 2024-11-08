// src/hooks/useInventory.js
import { useDispatch, useSelector } from "react-redux";

import {
  addInvoice,
  addProductFetch,
  createCustomer,
  fetchInvoices,
  getCustomers,
  getProducts,
  resetSubmitState as resetSubmitStateSlice,
} from "./invoiceSlice";

const useInvoice = () => {
  const dispatch = useDispatch();
  const {
    invoices,
    storeState,
    invoiceState,
    customersList,
    customerState,
    productState,
    submitState,
    productsList,
  } = useSelector((state) => state.invoices);

  const getInvoices = async () => {
    try {
      dispatch(fetchInvoices());
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  const handleAddInvoice = async (invoice) => {
    try {
      dispatch(addInvoice(invoice));
    } catch (error) {
      console.error("Error adding invoice:", error);
    }
  };

  const deleteInvoice = async (id) => {
    try {
      dispatch(deleteInvoice(id));
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  const updateInvoice = async (id, invoice) => {
    try {
      dispatch(updateInvoice(id, invoice));
    } catch (error) {
      console.error("Error updating invoice:", error);
    }
  };

  const addCustomer = async (customer) => {
    try {
      dispatch(createCustomer(customer));
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      dispatch(getCustomers());
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      dispatch(deleteCustomer(id));
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const updateCustomer = async (id, customer) => {
    try {
      dispatch(updateCustomer(id, customer));
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const addProduct = async (product) => {
    try {
      dispatch(addProductFetch(product));
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      dispatch(getProducts());
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      dispatch(deleteProductFetch(id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const updateProduct = async (id, product) => {
    try {
      dispatch(updateProductFetch(id, product));
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const resetSubmitState = () => {
    dispatch(resetSubmitStateSlice());
  };

  return {
    storeState,
    invoiceState,
    invoices,
    getInvoices,
    deleteInvoice,
    updateInvoice,
    handleAddInvoice,
    addCustomer,
    customersList,
    fetchCustomers,
    deleteCustomer,
    updateCustomer,

    addProduct,
    fetchProducts,
    deleteProduct,
    updateProduct,

    customerState,
    productState,
    submitState,
    productsList,
    resetSubmitState,
  };
};

export default useInvoice;
