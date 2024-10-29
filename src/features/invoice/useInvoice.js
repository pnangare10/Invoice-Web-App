// src/hooks/useInventory.js
import { useDispatch, useSelector } from "react-redux";

import {
  addInvoice,
  fetchInvoices
} from "./invoiceSlice";

const useInvoice = () => {
  const dispatch = useDispatch();
  const { invoices, storeState, invoiceState } = useSelector(
    (state) => state.invoices
  );
  
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

  return {
    storeState,
    invoiceState,
    invoices,
    getInvoices,
    deleteInvoice,
    updateInvoice,
    handleAddInvoice,
  }
}

export default useInvoice;