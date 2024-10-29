import { createSlice } from "@reduxjs/toolkit";
import { ERROR, INITIAL, LOADED, LOADING } from "../../helpers/constants";

const initialState = {
  invoices: [],
  storeState: INITIAL,
  invoiceId: null,
  invoiceState: INITIAL,
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
      state.storeState = LOADING;
    },
    addInvoiceSuccess: (state, action) => {
      state.invoices.push(action.payload);
      state.storeState = LOADED;
    },
    addInvoiceFailure: (state) => {
      state.storeState = ERROR;
    },

    deleteInvoice: (state) => {
      state.storeState = LOADING;
    },
    deleteInvoiceSuccess: (state, action) => {
      state.storeState = LOADED;
    },
    deleteInvoiceFailure: (state) => {
      state.storeState = ERROR;
    },

    updateInvoice: (state) => {
      state.storeState = LOADING;
    },
    updateInvoiceSuccess: (state, action) => {
      state.storeState = LOADED;
    },
    updateInvoiceFailure: (state) => {
      state.storeState = ERROR;
    },
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
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
