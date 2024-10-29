import { ExpandMoreOutlined } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography
} from "@mui/material";
import { useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import SkeletonWrapper from "../../components/SkeletonWrapper";
import useInvoice from "./useInvoice";

const ViewInvoices = () => {
  const { getInvoices, invoices, storeState } = useInvoice();
  useEffect(() => {
    if (storeState === "INITIAL") getInvoices();
  }, []);

  const rightComponent = (
    <SkeletonWrapper loading={storeState === "LOADING"} list={true}>
      <Grid item xs={6}>
        <Grid item xs={12}>
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Typography variant="h4">View Invoices</Typography>
          </Grid>
        </Grid>
        <Grid item container spacing={1}>
          {invoices.map((invoice) => (
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreOutlined />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Grid
                    item
                    container
                    spacing={2}
                    justifyContent={"space-between"}
                  >
                    <Grid item>
                      <Typography>{invoice.id}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{invoice.invoiceDate}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{invoice.totalAmount}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{invoice.status}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>{invoice.customerName}</Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    This is the details for Accordion 1. You can put any content
                    here, like text, images, or other components.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </SkeletonWrapper>
  );

  return <MainLayout rightComponent={rightComponent} />;
};

export default ViewInvoices;
