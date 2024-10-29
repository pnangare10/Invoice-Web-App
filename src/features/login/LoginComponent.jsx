import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
  Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api, { baseURL } from "../../api/springApi";
import AppBar from "../../components/AppBar";
import { FacebookIcon, GoogleIcon, SitemarkIcon } from "../../CustomIcons";
import { validationSchema } from "../../schemas/loginForm"; // Assuming you have Yup schema here
import { useAuth } from "../auth/AuthContext";
import ForgotPassword from "./ForgotPassword";

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

const LoginComponent = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setToken, token, setIsLoggedIn, helo } = useAuth();
  const [jwtToken, setJwtToken] = useState(null);
  const navigate = useNavigate();
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const data = {
          username: values.email,
          password: values.password,
        };
        const response = await api.post("/auth/public/signin", data);

        toast.success("Login Successful");
        formik.resetForm();
        if (response.status === 200 && response.data.jwtToken) {
          setJwtToken(response.data.jwtToken);
          const decodedToken = jwtDecode(response.data.jwtToken);
          handleSuccessfulLogin(response.data.jwtToken, decodedToken);
        } else {
          toast.error(
            "Login failed. Please check your credentials and try again."
          );
        }
      } catch (error) {
        toast.error("Invalid credentials");
      } finally {
        setLoading(false);
      }
    },
  });

  const handleSuccessfulLogin = (token, decodedToken) => {
    const user = {
      username: decodedToken.sub,
      roles: decodedToken.roles ? decodedToken.roles.split(",") : [],
    };
    localStorage.setItem("JWT_TOKEN", token);
    localStorage.setItem("USER", JSON.stringify(user));

    //store the token on the context state  so that it can be shared any where in our application by context provider
    setToken(token);
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [navigate, token]);

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
            Sign in
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
            <FormControl>
              <FormLabel htmlFor="email">Username or Email</FormLabel>
              <TextField
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                fullWidth
                variant="outlined"
                color={
                  formik.touched.email && formik.errors.email
                    ? "error"
                    : "primary"
                }
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link
                  component="button"
                  type="button"
                  onClick={handleClickOpen}
                  variant="body2"
                  sx={{ alignSelf: "baseline" }}
                >
                  Forgot your password?
                </Link>
              </Box>
              <TextField
                id="password"
                name="password"
                type="password"
                placeholder="••••••"
                autoComplete="current-password"
                fullWidth
                variant="outlined"
                color={
                  formik.touched.password && formik.errors.password
                    ? "error"
                    : "primary"
                }
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              Sign in
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Don&apos;t have an account?{" "}
              <Link
                href="/material-ui/getting-started/templates/sign-in/"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() =>
                (window.location.href = `${baseURL}/oauth2/authorization/google`)
              }
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign in with Facebook")}
              startIcon={<FacebookIcon />}
            >
              Sign in with Facebook
            </Button>
          </Box>
        </Card>
      </SignInContainer>
    </Box>
  );
};

export default LoginComponent;
