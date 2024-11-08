import { createSlice } from "@reduxjs/toolkit";
import { ERROR, INITIAL, LOADED, LOADING } from "../../helpers/constants";

const initialState = {
  invoices: [],
  storeState: INITIAL,
  invoiceId: null,
  invoiceState: INITIAL,
  submitState: INITIAL,
  customerState: INITIAL,
  productState: INITIAL,
  customersList: [],
  productsList: []
};

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    fetchInvoices: (state) => {
      state.invoiceState = LOADING;
    },
    fetchInvoicesSuccess: (state, action) => {
      state.invoices = action.payload;
      state.invoiceState = LOADED;
    },
    fetchInvoicesFailure: (state) => {
      state.invoiceState = ERROR;
    },

    addInvoice: (state) => {
      state.submitState = LOADING;
    },
    addInvoiceSuccess: (state, action) => {
      state.invoices = [action.payload, ...state.invoices];
      state.submitState = LOADED;
    },
    addInvoiceFailure: (state) => {
      state.submitState = ERROR;
    },

    deleteInvoice: (state) => {
      state.invoiceState = LOADING;
    },
    deleteInvoiceSuccess: (state, action) => {
      state.invoiceState = LOADED;
    },
    deleteInvoiceFailure: (state) => {
      state.invoiceState = ERROR;
    },

    updateInvoice: (state) => {
      state.invoiceState = LOADING;
    },
    updateInvoiceSuccess: (state, action) => {
      state.invoiceState = LOADED;
    },
    updateInvoiceFailure: (state) => {
      state.invoiceState = ERROR;
    },

    resetSubmitState: (state) => {
      state.submitState = INITIAL;
    },

    createCustomer: (state) => {
      state.customerState = LOADING;
    },
    createCustomerSuccess: (state, action) => {
      state.customerState = LOADED;
      state.customersList.push(action.payload);
    },
    createCustomerFailure: (state) => {
      state.customerState = ERROR;
    },

    getCustomers: (state) => {
      state.customerState = LOADING;
    },
    getCustomersSuccess: (state, action) => {
      state.customerState = LOADED;
      state.customersList = action.payload;
    },
    getCustomersFailure: (state) => {
      state.customerState = ERROR;
    },

    deleteCustomer: (state) => {
      state.customerState = LOADING;
    },
    deleteCustomerSuccess: (state, action) => {
      state.customerState = LOADED;
    },
    deleteCustomerFailure: (state) => {
      state.customerState = ERROR;
    },

    updateCustomer: (state) => {
      state.customerState = LOADING;
    },
    updateCustomerSuccess: (state, action) => {
      state.customerState = LOADED;
    },
    updateCustomerFailure: (state) => {
      state.customerState = ERROR;
    },

    //slices for product management
    addProductFetch: (state) => {
      state.productState = LOADING;
    },
    addProductSuccess: (state, action) => {
      state.productState = LOADED;
      state.productsList.push(action.payload);
    },
    addProductFailure: (state) => {
      state.productState = ERROR;
    },

    updateProductFetch: (state) => {
      state.productState = LOADING;
    },
    updateProductSuccess: (state, action) => {
      state.productState = LOADED;

    },
    updateProductFailure: (state) => {
      state.productState = ERROR;
    },

    deleteProductFetch: (state) => {
      state.productState = LOADING;
    },
    deleteProductSuccess: (state, action) => {
      state.productState = LOADED;
    },
    deleteProductFailure: (state) => {
      state.productState = ERROR;
    },
      getProducts: (state) => {
      state.productState = LOADING;
    },
    getProductsSuccess: (state, action) => {
      state.productState = LOADED;
      state.productsList = action.payload;
    },
    getProductsFailure: (state) => {
      state.productState = ERROR;
    }


  },
});

export const {
  fetchInvoices,
  fetchInvoicesSuccess,
  fetchInvoicesFailure,

  addInvoice,
  addInvoiceSuccess,
  addInvoiceFailure,

  deleteInvoice,
  deleteInvoiceSuccess,
  deleteInvoiceFailure,

  updateInvoice,
  updateInvoiceSuccess,
  updateInvoiceFailure,

  createCustomer,
  createCustomerSuccess,
  createCustomerFailure,

  getCustomers,
  getCustomersSuccess,
  getCustomersFailure,

  deleteCustomer,
  deleteCustomerSuccess,
  deleteCustomerFailure,

  updateCustomer,
  updateCustomerSuccess,
  updateCustomerFailure,

  addProductFetch,
  addProductSuccess,
  addProductFailure,

  updateProductFetch,
  updateProductSuccess,
  updateProductFailure,

  deleteProductFetch,
  deleteProductSuccess,
  deleteProductFailure,

  getProducts,
  getProductsSuccess,
  getProductsFailure,

  resetSubmitState

} = invoiceSlice.actions;

export default invoiceSlice.reducer;
