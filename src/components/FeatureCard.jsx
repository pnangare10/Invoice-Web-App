import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

const FeatureCard = ({ details }) => (
  <Grid item>
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "350px",
        height: "250px",
        padding: "20px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s ease-in-out",
        backgroundColor: "#fff",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Box sx={{ width: "50px", height: "50px" }} >{details.icon}</Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {details.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {details.description}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default FeatureCard;
