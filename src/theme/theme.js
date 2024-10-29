import React, { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { inputsCustomizations } from "./customizations/inputs";
import { dataDisplayCustomizations } from "./customizations/dataDisplay";
import { feedbackCustomizations } from "./customizations/feedback";
import { navigationCustomizations } from "./customizations/navigation";
import { surfacesCustomizations } from "./customizations/surfaces";
import { colorSchemes, typography, shadows, shape } from "./themePrimitives";

const theme = createTheme({
  palette: {
    mode: 'light', // Set default to 'light' or 'dark' to apply the initial color scheme
    ...colorSchemes.light.palette, // Use the 'light' color scheme palette by default
  },
  cssVariables: {
    colorSchemeSelector: "data-mui-color-scheme",
    cssVarPrefix: "template",
  },
  typography,
  shadows,
  shape,
  components: {
    ...inputsCustomizations,
    ...dataDisplayCustomizations,
    ...feedbackCustomizations,
    ...navigationCustomizations,
    ...surfacesCustomizations,
  },
});


export default theme;

