import { Box, Stack, styled, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useFormik } from "formik";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/springApi";
import AppBar from "../../components/AppBar";
import { SitemarkIcon } from "../../CustomIcons";
import signupValidationSchema from "../../schemas/signUpValidationSchema";
import { useAuth } from "../auth/AuthContext";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "750px",
    minWidth: "500px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  paddingTop: 0,
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const SignupComponent = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setToken, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      name: "",
    },
    validationSchema: signupValidationSchema, // Define validation schema specific for signup
    onSubmit: async (values) => {
      if (values.password !== values.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      try {
        setLoading(true);
        const data = {
          username: values.username,
          email: values.email,
          password: values.password,
          companyName: values.companyName,
          name: values.name,
        };

        const response = await api.post("/auth/public/signup", data);

        if (response.status === 200) {
          // Assuming 201 Created for successful signup
          toast.success("Signup Successful");
          formik.resetForm();

          if (response.data.jwtToken) {
            const jwtToken = response.data.jwtToken;
            const decodedToken = jwtDecode(jwtToken);
            handleSuccessfulSignup(jwtToken, decodedToken);
          } else {
            navigate("/login");
          }
        } else {
          toast.error("Signup failed. Please try again.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Signup failed");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleSuccessfulSignup = (token, decodedToken) => {
    const user = {
      username: decodedToken.sub,
      roles: decodedToken.roles ? decodedToken.roles.split(",") : [],
    };
    localStorage.setItem("JWT_TOKEN", token);
    localStorage.setItem("USER", JSON.stringify(user));

    setToken(token);
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppBar showMenu={false} />

      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined" m={0}>
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Create an Account
          </Typography>
          <Typography>
            Already have an account?{" "}
            <Link
              component="button"
              type="button"
              onClick={() => navigate("/login")}
              variant="body2"
              sx={{ alignSelf: "baseline" }}
            >
              Login here
            </Link>
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            {/* Username Field */}
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                id="username"
                name="username"
                type="text"
                fullWidth
                variant="outlined"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </FormControl>

            {/* Email Field */}
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                name="email"
                type="email"
                fullWidth
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </FormControl>

            {/* Company Name Field */}
            <FormControl>
              <FormLabel htmlFor="companyName">Company Name</FormLabel>
              <TextField
                id="companyName"
                name="companyName"
                type="text"
                fullWidth
                variant="outlined"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.companyName &&
                  Boolean(formik.errors.companyName)
                }
                helperText={
                  formik.touched.companyName && formik.errors.companyName
                }
              />
            </FormControl>

            {/* Password Field */}
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                name="password"
                type="password"
                fullWidth
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </FormControl>

            {/* Confirm Password Field */}
            <FormControl>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                fullWidth
                variant="outlined"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              Sign up
            </Button>
          </Box>
        </Card>
      </SignInContainer>
    </Box>
  );
};

export default SignupComponent;
