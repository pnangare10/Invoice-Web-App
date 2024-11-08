import api from "../../api/springApi";

export const getInvoicesAPI = async () => api.get("/invoices");

export const addInvoiceAPI = async (invoice) =>
  api.post("/invoices", invoice);

export const deleteInvoiceAPI = async (id) =>
  api.delete(`/invoices/${id}`);

export const updateInvoiceAPI = async (id, invoice) =>
  api.put(`/invoices/${id}`, invoice);

export const addCustomerAPI = async (customer) =>
  api.post("/customers", customer);

export const getCustomersAPI = async () => api.get("/customers");

export const deleteCustomerAPI = async (id) =>
  api.delete(`/customers/${id}`);

export const updateCustomerAPI = async (id, customer) =>
  api.put(`/customers/${id}`, customer);

export const getProductsAPI = async () => api.get("/products");

export const addProductAPI = async (product) => api.post("/products", product);

export const deleteProductAPI = async (id) => api.delete(`/products/${id}`);

export const updateProductAPI = async (id, product) =>
  api.put(`/products/${id}`, product);


