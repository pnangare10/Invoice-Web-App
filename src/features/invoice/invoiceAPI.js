import api from "../../api/springApi"

export const getInvoicesAPI = async () => api.get("/invoices");

export const addInvoiceAPI = async (invoice) =>
  api.post("/invoices", invoice);

export const deleteInvoiceAPI = async (id) =>
  api.delete(`/invoices/${id}`);

export const updateInvoiceAPI = async (id, invoice) =>
  api.put(`/invoices/${id}`, invoice);