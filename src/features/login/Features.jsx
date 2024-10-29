import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShieldIcon from '@mui/icons-material/Shield';
import TimelineIcon from '@mui/icons-material/Timeline';
import TuneIcon from '@mui/icons-material/Tune';
import { Grid } from "@mui/material";
import React from "react";
import FeatureCard from "../../components/FeatureCard";

const Features = () => {
  const featureList = [
    {
      "title": "Automated Invoicing",
      "description": "Say goodbye to repetitive tasks. Set up recurring invoices with custom schedules, and let automation take care of the rest, so you can focus on growing your business.",
      "icon": <AutorenewIcon  width="100%" height="100%"/>
    },
    {
      "title": "Real-Time Payment Tracking",
      "description": "Never wonder about payment status again. Get real-time updates on when invoices are viewed, paid, or overdue, giving you peace of mind and control over your cash flow.",
      "icon": <TimelineIcon width="100%" height="100%"/>
    },
    {
      "title": "Customizable Invoice Templates",
      "description": "Create professional, branded invoices with our easy-to-use templates. Add your logo, colors, and style to make every invoice a reflection of your brand.",
      "icon": <TuneIcon width="100%" height="100%"/>
    },
    {
      "title": "Multi-Currency Support",
      "description": "Work with clients around the world? No problem. Send invoices in multiple currencies, making it easy to manage international transactions seamlessly.",
      "icon": <AttachMoneyIcon width="100%" height="100%"/>
    },
    {
      "title": "Detailed Financial Reports",
      "description": "Gain insights into your business with comprehensive reports on income, expenses, and overdue invoices, helping you make informed financial decisions.",
      "icon": <BarChartIcon width="100%" height="100%"/>
    },
    {
      "title": "Secure Online Payments",
      "description": "Offer your clients a variety of secure payment options, including credit cards and bank transfers, to streamline the payment process and get paid faster.",
      "icon": <ShieldIcon  width="100%" height="100%"/>
    }
  ]

  
  return (
    <Grid item container sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: "40px",
      justifyContent: "center",
      padding: "20px"
    }}>
      {featureList.map((feature, index) => (
          <FeatureCard details={feature} />
      ))}
    </Grid>
  );
};

export default Features;
