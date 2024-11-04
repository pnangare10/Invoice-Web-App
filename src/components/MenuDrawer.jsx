import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CreateIcon from "@mui/icons-material/Create";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import IceSkatingIcon from "@mui/icons-material/IceSkating";
import LogoutIcon from "@mui/icons-material/Logout";
import ReceiptIcon from "@mui/icons-material/Receipt";
import TableViewIcon from "@mui/icons-material/TableView";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";

import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DRAWER_WIDTH } from "../constants";
import { useAuth } from "../features/auth/AuthContext";
import AppBar from "./AppBar";

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "isBrowser",
})(({ theme, open, isBrowser }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${DRAWER_WIDTH}px`,
  ...(open &&
    isBrowser && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const createMenuItems = (logout) => {
  return [
    {
      label: "Invoices",
      icon: <ReceiptIcon />,
      subMenu: [
        {
          label: "Create Invoice",
          value: "/create-invoices",
          icon: <CreateIcon />,
        },
        {
          label: "View Invoices",
          value: "/view-invoices",
          icon: <TableViewIcon />,
        },
      ],
    },
    {
      label: "Inventory Management",
      icon: <IceSkatingIcon />,
      subMenu: [
        {
          label: "Inventory",
          value: "/inventory",
          icon: <FileDownloadIcon />,
        },
        {
          label: "Purchase",
          value: "/inventory/purchase",
          icon: <FileDownloadIcon />,
        },
        {
          label: "Sales",
          value: "/inventory/sales",
          icon: <FileUploadIcon />,
        },
        {
          label: "Inward",
          value: "/inventory/inward",
          icon: <FileUploadIcon />,
        },
        {
          label: "Outward",
          value: "/inventory/outward",
          icon: <FileUploadIcon />,
        },
      ],
    },
    {
      label: "trial",
      value: "/trial",
    },
    {
      label: "Logout",
      value: "/logout",
      action: logout,
      icon: <LogoutIcon />,
    },
  ];
};

export default function PersistentDrawerLeft({ header }) {
  const theme = useTheme();
  const isBrowser = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = React.useState(isBrowser ? true : false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = React.useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const MENU_ITEMS = createMenuItems(() => {
    logout();
  });

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSubMenuClick = (index) => {
    setOpenSubMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <Box sx={{ display: "flex", height: "auto" }}>
      <AppBar showMenu={true} open={open} setOpen={setOpen} />
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
        docked={"false"}
        variant={isBrowser ? "persistent" : "temporary"}
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {MENU_ITEMS.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                key={index}
                disablePadding
                onClick={() => {
                  if (typeof item.action === "function") {
                    item.action();
                  } else if (item.subMenu) {
                    handleSubMenuClick(index);
                  } else {
                    navigate(item.value);
                  }
                }}
              >
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                  {item.subMenu ? (
                    openSubMenuIndex === index ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  ) : null}
                </ListItemButton>
              </ListItem>
              {item.subMenu ? (
                <Collapse
                  in={openSubMenuIndex === index}
                  sx={{ ml: 3 }}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.subMenu.map((subMenuItem, subIndex) => (
                      <ListItemButton
                        key={subIndex + "1"}
                        onClick={() =>
                          subMenuItem.action
                            ? item.action()
                            : navigate(subMenuItem.value)
                        }
                      >
                        <ListItemIcon>{subMenuItem.icon}</ListItemIcon>
                        <ListItemText primary={subMenuItem.label} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              ) : null}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
      <Main open={open} isBrowser={isBrowser}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
