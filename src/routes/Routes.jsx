// src/routes/Routes.jsx
import React from "react";
import { Route } from "react-router-dom";
import AuthProvider from "../features/auth/AuthContext";
import Dashboard from "../features/dashboard/Dashboard";
import CreateInvoice from "../features/invoice/CreateInvoice";
import ViewInvoices from "../features/invoice/ViewInvoices";
import LandingPage from "../features/login/LandinPage";
import LoginComponent from "../features/login/LoginComponent";
import OAuth2RedirectHandler from "../features/login/OAuth2RedirectHandler";
import LoginRoute from "./LoginRoute";
import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

const Routes = () => {
  return (
    <>
      <Route element={<AuthProvider />}>
        <Route path="/" element={<LandingPage />} />
        <Route element={<LoginRoute />}>
          <Route path="/login" element={<LoginComponent />} />
        </Route>
        <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        <Route element={<ProtectedRoute />}>
        {/* Protected Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-invoices" element={<CreateInvoice />} />
          <Route path="/view-invoices" element={<ViewInvoices />} />
        </Route>
        <Route element={<RoleProtectedRoute />}>
          {/* Role-based Routes */}
          {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
        </Route>
      </Route>
      {/* Add the Inventory component */}
    </>
  );
};

export default Routes;
