import { call, put, takeEvery } from "@redux-saga/core/effects";
import toast from "react-hot-toast";
import { addInvoiceAPI, deleteInvoiceAPI, getInvoicesAPI, updateInvoiceAPI } from "./invoiceAPI";
import {
  addInvoiceFailure,
  addInvoiceSuccess,
  deleteInvoiceFailure,
  deleteInvoiceSuccess,
  fetchInvoicesFailure,
  fetchInvoicesSuccess,
  updateInvoiceFailure,
  updateInvoiceSuccess
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
    console.log(response);
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

export default function* invoicesSaga() {
  yield takeEvery("invoices/fetchInvoices", fetchInvoicesSaga);
  yield takeEvery("invoices/addInvoice", addInvoiceSaga);
  yield takeEvery("invoices/deleteInvoice", deleteInvoiceSaga);
  yield takeEvery("invoices/updateInvoice", updateInvoiceSaga);
}
