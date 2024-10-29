import { Card, CardContent, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import React from 'react';

const data = [
  { month: 'Jan', sales: 40000, purchase: 30000 },
  { month: 'Feb', sales: 50000, purchase: 35000 },
  { month: 'Mar', sales: 55000, purchase: 40000 },
  { month: 'Apr', sales: 45000, purchase: 25000 },
  { month: 'May', sales: 60000, purchase: 48000 },
  { month: 'Jun', sales: 70000, purchase: 54000 },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const salesData = [40000, 50000, 55000, 45000, 60000, 70000];
const purchaseData = [30000, 35000, 40000, 25000, 48000, 54000];

const SalesPurchaseChart = () => {
  return (
    <Card sx={{ width: '100%', padding: 2 }}>
      <CardContent>
      <Typography variant="h6" component="div" gutterBottom>
        Sales & Purchase
      </Typography>
      <BarChart
        width={800}
        height={300}
        borderRadius={2}
        series={[
          { label: 'Sales', data: salesData , color: '#78cdf2' },
          { label: 'Purchase', data: purchaseData , color: '#57d964' },
        ]}
        xAxis={[{ data: months , scaleType: "band" }]}

      /></CardContent>
    </Card>
  );
};

export default SalesPurchaseChart;
