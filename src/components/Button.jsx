import { CircularProgress, Button as MuiButton } from "@mui/material";

import React from "react";

const Button = ({ label, children, loading=false, disabled=false, ...props }) => {

  return (
    <MuiButton
      elevation={13}
      disabled={disabled || loading}
      {...props}
    >
      {!loading ? children : <CircularProgress />}
    </MuiButton>
  );
};

export default Button;
