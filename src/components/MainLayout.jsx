import { Box, Grid } from "@mui/material";
import React from "react";
import MenuDrawer from "./MenuDrawer";

const MainLayout = ({ rightComponent, header }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        backgroundColor: "background.paper",
      }}
    >
        <MenuDrawer header={header} />
      <Grid
        item
        container
        xs={12}
        sx={{
          padding: 1,
          m: 2,
          mt: 10,
        }}
      >
        <Grid item >
          {rightComponent}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainLayout;
