import * as React from "react";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import ReportIcon from "@mui/icons-material/Report";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LinkIcon from "@mui/icons-material/Link";
const SideBar = () => {
  const location = useLocation();
  return (
    <>
      <React.Fragment>
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <HomeIcon
              color={
                location.pathname === ("/" || "/ngo/dashboard")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/ngo/classes">
          <ListItemIcon>
            <ClassOutlinedIcon
              color={
                location.pathname.startsWith("/ngo/classes")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Classes" />
        </ListItemButton>
        <ListItemButton component={Link} to="/ngo/subjects">
          <ListItemIcon>
            <AssignmentIcon
              color={
                location.pathname.startsWith("/ngo/subjects")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Subjects" />
        </ListItemButton>
        <ListItemButton component={Link} to="/ngo/teachers">
          <ListItemIcon>
            <SupervisorAccountOutlinedIcon
              color={
                location.pathname.startsWith("/ngo/teachers")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Teachers" />
        </ListItemButton>
        <ListItemButton component={Link} to="/ngo/students">
          <ListItemIcon>
            <PersonOutlineIcon
              color={
                location.pathname.startsWith("/ngo/students")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItemButton>
        <ListItemButton component={Link} to="/ngo/notices">
          <ListItemIcon>
            <AnnouncementOutlinedIcon
              color={
                location.pathname.startsWith("/ngo/notices")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Notices" />
        </ListItemButton>
        <ListItemButton component={Link} to="/ngo/addfacility">
          <ListItemIcon>
            <ReportIcon
              color={
                location.pathname.startsWith("/ngo/addfacility")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Facility" />
        </ListItemButton>
        <ListItemButton component={Link} to="/ngo/urlConverter">
          <ListItemIcon>
            <LinkIcon
              color={
                location.pathname.startsWith("/ngo/urlConverter")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="URL Converter" />
        </ListItemButton>
        {/* <ListItemButton component={Link} to="/ngo/complains">
          <ListItemIcon>
            <ReportIcon
              color={
                location.pathname.startsWith("/ngo/complains")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Complains" />
        </ListItemButton> */}
      </React.Fragment>
      <Divider sx={{ my: 1 }} />
      <React.Fragment>
        {/* <ListSubheader component="div" inset>
          User
        </ListSubheader> */}
        {/* <ListItemButton component={Link} to="/ngo/profile">
          <ListItemIcon>
            <AccountCircleOutlinedIcon
              color={
                location.pathname.startsWith("/ngo/profile")
                  ? "primary"
                  : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton> */}
        <ListItemButton component={Link} to="/logout">
          <ListItemIcon>
            <ExitToAppIcon
              color={
                location.pathname.startsWith("/logout") ? "primary" : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </React.Fragment>
    </>
  );
};

export default SideBar;
