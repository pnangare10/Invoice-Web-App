import { useTheme } from "@emotion/react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import {
  CUSTOMER_ICON,
  SUPPLIER_ICON
} from "../../assets";

const ProductSummaryItems = [
  {
    title: "Number of Suppliers",
    value: "68", 
    icon: SUPPLIER_ICON, 
  },
  {
    title: "Number of Customers",
    value: "49",
    icon: CUSTOMER_ICON, 
  },
];

const ProductOverview = () => {
  const theme = useTheme();
  
  const ProductOverviewItem = ({ item, index }) => (
    <Grid
      item
      xs={5.9}
      key={`Product-overview-item-${index}`}
      sx={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid item display={"flex"} justifyContent={"center"}>
        <Box
          component="img"
          sx={{
            width: 30,
            height: 30,
            margin: "5px",
          }}
          src={item.icon}
          alt=""
        />
      </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="subtitle2">{item.value}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="body1">{item.title}</Typography>
        </Grid>
    </Grid>
  );

  return (
    <Card xs={12} sx={{ maxHeight: 150 }}>
      <CardContent>
        <Grid item container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" component="div">
              Product Overview
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={12}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            {ProductSummaryItems.map((item, index) => (
              <React.Fragment key={index}>
                <ProductOverviewItem item={item} index={index} />
                {index < ProductSummaryItems.length - 1 && (
                  <Divider
                    orientation="vertical"
                    key={`${index}_divider`}
                    thiccness={"2px"}
                    flexItem
                    variant="middle"
                  />
                )}
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProductOverview;
