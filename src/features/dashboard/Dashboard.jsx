import { Grid } from "@mui/material";
import React from "react";
import MainLayout from "../../components/MainLayout";
import InventoryOverview from "./InventoryOverview";
import ProductOverview from "./ProductOverview";
import PurchaseOverview from "./PurchaseOverview";
import SalesOverview from "./SalesOverview";
import SalesPurchaseChart from "./SalesPurchaseChart";

const Dashboard = () => {
  const rightComponent = (
    <Grid item container xs={12} columnSpacing={2}>
      <Grid item container xs={8} rowSpacing={2}>
        <Grid item xs={12}>
        {/* <Grow in={true} timeout={1000}> */}
          <SalesOverview />
          {/* </Grow> */}
        </Grid>
        <Grid item xs={12}>
          <PurchaseOverview />
        </Grid>
        <Grid item xs={12}>
          <SalesPurchaseChart />
        </Grid>
      </Grid>
      <Grid item container xs={4} rowSpacing={2}>
        <Grid item xs={12}>
          <InventoryOverview />
        </Grid>
        <Grid item xs={12}>
          <ProductOverview />
        </Grid>
        <Grid item xs={12}>
          <ProductOverview />
        </Grid>
      </Grid>
    </Grid>
  );

  return <MainLayout rightComponent={rightComponent} />;
};

export default Dashboard;
