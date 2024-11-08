import { call, put, takeEvery } from "@redux-saga/core/effects";
import toast from "react-hot-toast";
import {
  addCustomerAPI,
  addInvoiceAPI,
  addProductAPI,
  deleteCustomerAPI,
  deleteInvoiceAPI,
  deleteProductAPI,
  getCustomersAPI,
  getInvoicesAPI,
  getProductsAPI,
  updateCustomerAPI,
  updateInvoiceAPI,
  updateProductAPI,
} from "./invoiceAPI";
import {
  addInvoiceFailure,
  addInvoiceSuccess,
  addProductFailure,
  addProductSuccess,
  createCustomerFailure,
  createCustomerSuccess,
  deleteCustomerFailure,
  deleteCustomerSuccess,
  deleteInvoiceFailure,
  deleteInvoiceSuccess,
  deleteProductFailure,
  deleteProductSuccess,
  fetchInvoicesFailure,
  fetchInvoicesSuccess,
  getCustomersFailure,
  getCustomersSuccess,
  getProductsFailure,
  getProductsSuccess,
  updateCustomerFailure,
  updateCustomerSuccess,
  updateInvoiceFailure,
  updateInvoiceSuccess,
  updateProductFailure,
  updateProductSuccess,
} from "./invoiceSlice";

function* fetchInvoicesSaga() {
  try {
    const response = yield call(getInvoicesAPI);
    yield put(fetchInvoicesSuccess(response.data));
  } catch (error) {
    console.error("Error fetching invoices:", error);
    yield put(fetchInvoicesFailure());
  }
}

function* addInvoiceSaga(action) {
  try {
    const response = yield call(addInvoiceAPI, action.payload);
    toast.success("Invoice added successfully");
    yield put(addInvoiceSuccess(response.data));
  } catch (error) {
    console.error("Error adding invoice:", error);
    toast.error("Error adding invoice");
    yield put(addInvoiceFailure());
  }
}

function* deleteInvoiceSaga(action) {
  try {
    const response = yield call(deleteInvoiceAPI(action.payload));
    yield put(deleteInvoiceSuccess());
    toast.success("Invoice deleted successfully");
  } catch (error) {
    console.error("Error deleting invoice:", error);
    yield put(deleteInvoiceFailure());
    toast.error("Error deleting invoice");
  }
}

function* updateInvoiceSaga(action) {
  try {
    const response = yield call(
      updateInvoiceAPI(action.payload.id, action.payload.invoice)
    );
    yield put(updateInvoiceSuccess(response.data));
    toast.success("Invoice updated successfully");
  } catch (error) {
    console.error("Error updating invoice:", error);
    yield put(updateInvoiceFailure());
    toast.error("Error updating invoice");
  }
}

function* addCustomerSaga(action) {
  try {
    const response = yield call(addCustomerAPI, action.payload);
    yield put(createCustomerSuccess(response.data));
    toast.success("Customer added successfully");
  } catch (error) {
    console.error("Error adding customer:", error);
    yield put(createCustomerFailure());
    toast.error("Error adding customer");
  }
}

//get customers
function* getCustomersSaga() {
  try {
    const response = yield call(getCustomersAPI);
    yield put(getCustomersSuccess(response.data));
  } catch (error) {
    console.error("Error fetching customers:", error);
    yield put(getCustomersFailure());
  }
}

function* deleteCustomerSaga(action) {
  try {
    yield call(deleteCustomerAPI, action.payload);
    yield put(deleteCustomerSuccess());
    toast.success("Customer deleted successfully");
  } catch (error) {
    console.error("Error deleting customer:", error);
    yield put(deleteCustomerFailure());
    toast.error("Error deleting customer");
  }
}

function* updateCustomerSaga(action) {
  try {
    yield call(updateCustomerAPI, action.payload.id, action.payload.customer);
    yield put(updateCustomerSuccess());
    toast.success("Customer updated successfully");
  } catch (error) {
    console.error("Error updating customer:", error);
    yield put(updateCustomerFailure());
    toast.error("Error updating customer");
  }
}

function* getProductsSaga() {
  try {
    const response = yield call(getProductsAPI);
    yield put(getProductsSuccess(response.data));
  } catch (error) {
    console.error("Error fetching products:", error);
    yield put(getProductsFailure());
  }
}

function* addProductSaga(action) {
  try {
    yield call(addProductAPI, action.payload);
    yield put(addProductSuccess());
    toast.success("Product added successfully");
  } catch (error) {
    console.error("Error adding product:", error);
    yield put(addProductFailure());
    toast.error("Error adding product");
  }
}

function* updateProductSaga(action) {
  try {
    yield call(updateProductAPI, action.payload.id, action.payload.product);
    yield put(updateProductSuccess());
    toast.success("Product updated successfully");
  } catch (error) {
    console.error("Error updating product:", error);
    yield put(updateProductFailure());
    toast.error("Error updating product");
  }
}

function* deleteProductSaga(action) {
  try {
    yield call(deleteProductAPI, action.payload);
    yield put(deleteProductSuccess());
    toast.success("Product deleted successfully");
  } catch (error) {
    console.error("Error deleting product:", error);
    yield put(deleteProductFailure());
    toast.error("Error deleting product");
  }
}


export default function* invoicesSaga() {
  yield takeEvery("invoices/fetchInvoices", fetchInvoicesSaga);
  yield takeEvery("invoices/addInvoice", addInvoiceSaga);
  yield takeEvery("invoices/deleteInvoice", deleteInvoiceSaga);
  yield takeEvery("invoices/updateInvoice", updateInvoiceSaga);
  yield takeEvery("invoices/createCustomer", addCustomerSaga);
  yield takeEvery("invoices/getCustomers", getCustomersSaga);
  yield takeEvery("invoices/deleteCustomer", deleteCustomerSaga);
  yield takeEvery("invoices/updateCustomer", updateCustomerSaga);

  yield takeEvery("invoices/addProductFetch", addProductSaga);
  yield takeEvery("invoices/updateProductFetch", updateProductSaga);
  yield takeEvery("invoices/deleteProductFetch", deleteProductSaga);
  yield takeEvery("invoices/getProducts", getProductsSaga);

}
