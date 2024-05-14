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

const SideBar = () => {
  const location = useLocation();
  return (
    <>
      <React.Fragment>
        <ListItemButton
          style={
            location.pathname === ("/" || "/admin/dashboard")
              ? {
                  backgroundColor: "rgba(112, 127, 221, 0.1)",
                  color: "#707FDD",
                }
              : {}
          }
          component={Link}
          to="/"
        >
          <ListItemIcon>
            <HomeIcon
              style={{
                color:
                  location.pathname === ("/" || "/admin/dashboard")
                    ? "#707FDD"
                    : "inherit",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton
          component={Link}
          to="/admin/allNgo"
          style={
            location.pathname.startsWith("/admin/allNgo")
              ? {
                  backgroundColor: "rgba(112, 127, 221, 0.1)",
                  color: "#707FDD",
                }
              : {}
          }
        >
          <ListItemIcon>
            <ClassOutlinedIcon
              style={{
                color: location.pathname.startsWith("/admin/allNgo")
                  ? "#707FDD"
                  : "inherit",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="NGOs" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/admin/addNgo"
          style={
            location.pathname.startsWith("/admin/addNgo")
              ? {
                  backgroundColor: "rgba(112, 127, 221, 0.1)",
                  color: "#707FDD",
                }
              : {}
          }
        >
          <ListItemIcon>
            <AssignmentIcon
              style={{
                color: location.pathname.startsWith("/admin/addNgo")
                  ? "#707FDD"
                  : "inherit",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Add NGO" />
        </ListItemButton>
        {false && (
          <ListItemButton
            component={Link}
            to="/admin/addDonor"
            style={
              location.pathname.startsWith("/admin/addDonor")
                ? {
                    backgroundColor: "rgba(112, 127, 221, 0.1)",
                    color: "#707FDD",
                  }
                : {}
            }
          >
            <ListItemIcon>
              <AssignmentIcon
                style={{
                  color: location.pathname.startsWith("/admin/addDonor")
                    ? "#707FDD"
                    : "inherit",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Add Donor" />
          </ListItemButton>
        )}
        {/*} <ListItemButton component={Link} to="/ngo/teachers">
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
        <ListItemButton component={Link} to="/ngo/complains">
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
        <ListSubheader component="div" inset>
          User
        </ListSubheader>
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

        <ListItemButton
          style={
            location.pathname.startsWith("/logout")
              ? {
                  backgroundColor: "rgba(112, 127, 221, 0.1)",
                  color: "#707FDD",
                  fontWeight: "600",
                }
              : {}
          }
          component={Link}
          to="/logout"
        >
          <ListItemIcon>
            <ExitToAppIcon
              style={{
                color: location.pathname.startsWith("/logout")
                  ? "#707FDD"
                  : "inherit",
              }}
            />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </React.Fragment>
    </>
  );
};

export default SideBar;
