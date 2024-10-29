import React from "react";
import {
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import styled from "@emotion/styled";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { DRAWER_WIDTH } from "../constants";

const CustomAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "isBrowser",
})(({ theme, open, isBrowser }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open &&
    isBrowser && {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: `${DRAWER_WIDTH}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}));

const AppBar = ({ open, setOpen, showMenu }) => {
  const theme = useTheme();
  const isBrowser = useMediaQuery(theme.breakpoints.up("md"));
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  return (
    <CustomAppBar position="fixed" open={open} isBrowser={isBrowser}>
      <Toolbar>
        {showMenu && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          variant="h6"
          component={Link}
          to="/dashboard"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          {"EasyLedger"}
        </Typography>
      </Toolbar>
    </CustomAppBar>
  );
};

export default AppBar;
