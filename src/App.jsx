import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import store from "./redux/store";
import Routes from "./routes/Routes";
import theme from "./theme/theme";

const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(Routes()), {
    basename: "",
  });
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
