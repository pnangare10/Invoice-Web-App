import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const InvoiceCard = ({ invoice }) => {
  return (
    <Card variant="outlined" key={invoice.id} width={"100%"}>
      <CardContent>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="subtitle2">
            {invoice.customer.customerName}
          </Typography>
          <Typography variant="body2">
            Amount: &#8377; {invoice.totalAmount}
          </Typography>
          <Typography variant="body2">Date: {invoice.invoiceDate}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

const RecentInvoices = ({ invoices }) => {
  const topInvoices = invoices?.slice(0, 5);
  return (
    <Grid item container>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
      >
        <Typography variant="h5" sx={{ margin: 2 }}>
          Recent Invoices
        </Typography>
        <Link
          component="button"
          type="button"
          onClick={() => navigate("/view-invoices")}
          variant="body2"
          sx={{ alignSelf: "baseline" }}
        >
          See all
        </Link>
      </Stack>
      <Grid container spacing={2}>
        {topInvoices?.map((invoice) => (
          <Grid item xs={12} key={invoice.id}>
            <InvoiceCard invoice={invoice} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default RecentInvoices;
