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
  CANCEL_PURCHASE_ICON,
  COST_ICON,
  PURCHASE_ICON,
  RETURN_ICON,
} from "../../assets"; // Ensure to add new icons for purchase overview

const PurchaseSummaryItems = [
  {
    title: "Purchases",
    value: "450",
    icon: PURCHASE_ICON,
  },
  {
    title: "Cost",
    value: "20",
    icon: COST_ICON,
  },
  {
    title: "Returns",
    value: "20",
    icon: RETURN_ICON,
  },
  {
    title: "Canceled",
    value: "15",
    icon: CANCEL_PURCHASE_ICON,
  },
];

const PurchaseOverview = () => {
  const PurchaseOverviewItem = ({ item, index }) => (
    <Grid
      item
      xs={2.9}
      key={`purchase-overview-item-${index}`}
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
          alt={item.title}
        />
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
    <Card xs={12} sx={{ maxHeight: 150 }}>
      <CardContent>
        <Grid item container direction="column" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" component="div">
              Purchase Overview
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={12}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            {PurchaseSummaryItems.map((item, index) => (
              <React.Fragment key={`purchase-item-${index}`}>
                <PurchaseOverviewItem item={item} index={index} />
                {index < PurchaseSummaryItems.length - 1 && (
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

export default PurchaseOverview;
