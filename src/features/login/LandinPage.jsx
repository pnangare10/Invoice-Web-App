import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "../../components/AppBar";
import Features from "./Features";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundRepeat: "repeat",
      }}
    >
      <Grid item container>
        <Grid item xs={12}>
        <AppBar showMenu={false} />
        </Grid>
        <Grid
          item
          container
          sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            margin: 5,
          }}
        >
          <Grid item my={4}>
            <Stack direction="column" columnGap={2}>
              <Typography variant="h1" textAlign={"center"}>
                CREATE, SEND, AND TRACK INVOICES WITH EASE - ALL IN ONE POWERFUL
                PLATFORM
              </Typography>
              <Typography variant="subtitle1" textAlign={"center"}>
                The #1 Invoice management platform for businesses.
              </Typography>
              <Typography variant="subtitle3" textAlign={"center"}>
                From invoicing to tracking payments, we help you get paid faster
                and stay organized.
              </Typography>
            </Stack>
          </Grid>

          <Grid item container spacing={3} justifyContent={"center"}>
            <Grid item xs={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  background: "darkcyan",
                }}
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>

          <Grid item container marginTop={4} width={"100%"}>
            <Grid item xs={12}>
              <Divider>
                <Typography variant="h5" textAlign={"center"}>
                  Why Choose Us?
                </Typography>
              </Divider>
            </Grid>
            <Features />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingPage;
