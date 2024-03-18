import { useState } from "react";
import {
  CssBaseline,
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppBar, Drawer } from "../../components/styles";
import Logout from "../Logout";
import SideBar from "./SideBar";

import AccountMenu from "../../components/AccountMenu";
import AdminHomePage from "./adminHomePage";
import AllNgoPage from "./allNgoPage";
import AddNgo from "./addNgo";
import NgoDetailsPage from "./ngoDetailsPage";
import NoticeDetail from "../noticeDetail";

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar open={open} position="absolute">
          <Toolbar sx={{ pr: "24px" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Admin Dashboard
            </Typography>
            <AccountMenu />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={open ? styles.drawerStyled : styles.hideDrawer}
        >
          <Toolbar sx={styles.toolBarStyled}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <SideBar />
          </List>
        </Drawer>
        <Box component="main" className="bg-white" sx={styles.boxStyled}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<AdminHomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/admin/dashboard" element={<AdminHomePage />} />
            <Route path="/admin/allNgo" element={<AllNgoPage />} />
            <Route path="/admin/addNgo" element={<AddNgo />} />
            <Route path="/admin/ngoDetails" element={<NgoDetailsPage />} />
            <Route path="/noticeDetail" element={<NoticeDetail />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default AdminDashboard;

const styles = {
  boxStyled: {
    backgroundColor: (theme) =>
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  toolBarStyled: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    px: [1],
  },
  drawerStyled: {
    display: "flex",
  },
  hideDrawer: {
    display: "flex",
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
};
