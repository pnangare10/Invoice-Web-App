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
  COST_ICON,
  PROFIT_ICON,
  REVENUE_ICON,
  SALES_ICON
} from "../../assets";

const SaleSummaryItems = [
  {
    title: "Sales",
    value: "832",
    icon: SALES_ICON,
  },
  {
    title: "Revenue",
    value: "18,300",
    icon: REVENUE_ICON,
  },
  {
    title: "Profit",
    value: "868",
    icon: PROFIT_ICON,
  },
  {
    title: "Cost",
    value: "17,432",
    icon: COST_ICON,
  },
];

const SalesOverview = () => {
  const SaleOverviewItem = ({ item, index }) => (
    <Grid
      item
      xs={2.9}
      key={`sale-overview-item-${index}`}
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
            margin: "10px",
          }}
          src={item.icon}
          alt=""
        ></Box>
      </Grid>
      <Grid item container>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <Typography variant="subtitle2">&#8377; {item.value}</Typography>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <Typography variant="body1">{item.title}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
  return (
    <Card xs={12} sx={{  maxHeight: 150 }}>
      <CardContent>
        <Grid item container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" component="div">
              Sales Overview
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={12}
            key={SaleSummaryItems.length}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            {SaleSummaryItems.map((item, index) => (
              <React.Fragment key={`sales_overview_item_${index}`}>
                <SaleOverviewItem item={item} index={index} />
                {index < SaleSummaryItems.length - 1 && (
                  <Divider orientation="vertical" thiccness={"2px"} flexItem variant="middle" />
                )}
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SalesOverview;
