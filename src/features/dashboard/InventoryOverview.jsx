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
  PURCHASE_ICON,
  SALES_ICON
} from "../../assets";

const InventorySummaryItems = [
  {
    title: "Quantity in Hand",
    value: "868", 
    icon: PURCHASE_ICON, 
  },
  {
    title: "To be Received",
    value: "200",
    icon: SALES_ICON,
  },
];

const InventoryOverview = () => {
  const theme = useTheme();
  
  const InventoryOverviewItem = ({ item, index }) => (
    <Grid
      item
      xs={5.9}
      key={`inventory-overview-item-${index}`}
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
              Inventory Overview
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={12}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            {InventorySummaryItems.map((item, index) => (
              <React.Fragment key={index}>
                <InventoryOverviewItem item={item} index={index} />
                {index < InventorySummaryItems.length - 1 && (
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

export default InventoryOverview;
