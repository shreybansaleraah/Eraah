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
import NGOProfile from "./NGOProfile";
import NGOHomePage from "./NGOHomePage";

import AddStudent from "./studentRelated/AddStudent";
import SeeComplains from "./studentRelated/SeeComplains";
import ShowStudents from "./studentRelated/ShowStudents";
import StudentAttendance from "./studentRelated/StudentAttendance";
import StudentExamMarks from "./studentRelated/StudentExamMarks";
import ViewStudent from "./studentRelated/ViewStudent";

import AddNotice from "./noticeRelated/AddNotice";
import ShowNotices from "./noticeRelated/ShowNotices";

import ShowSubjects from "./subjectRelated/ShowSubjects";
import SubjectForm from "./subjectRelated/SubjectForm";
import ViewSubject from "./subjectRelated/ViewSubject";

import AddTeacher from "./teacherRelated/AddTeacher";
import ChooseClass from "./teacherRelated/ChooseClass";
import ChooseSubject from "./teacherRelated/ChooseSubject";
import ShowTeachers from "./teacherRelated/ShowTeachers";
import TeacherDetails from "./teacherRelated/TeacherDetails";

import AddClass from "./classRelated/AddClass";
import ClassDetails from "./classRelated/ClassDetails";
import ShowClasses from "./classRelated/ShowClasses";
import AccountMenu from "../../components/AccountMenu";
import NoticeDetail from "../noticeDetail";

import errahIcon from "../../assets/errah.png";
import drawerIcon from "../../assets/drawerIcon.svg";
import AddFacility from "./facilityRelated/AddFacility";

const NGODashboard = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ display: "flex", overflow: "hidden" }}>
        <CssBaseline />
        <AppBar
          open={open}
          position="absolute"
          style={{ backgroundColor: "#FFFFFF" }}
        >
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
              {/* <MenuIcon /> */}
              <img src={drawerIcon} style={{ width: "40px", height: "35px" }} />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
              style={{ color: "#000000", fontWeight: "600" }}
            >
              NGO Dashboard
            </Typography>
            {/* <AccountMenu /> */}
            <img src={errahIcon} style={{ width: "3rem", height: "3rem" }} />
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
          <List
            component="nav"
            style={{ overflowX: "hidden", overflowY: "scroll" }}
          >
            <SideBar />
          </List>
        </Drawer>
        <Box component="main" sx={styles.boxStyled} className="px-2">
          <Toolbar className="mt-4" />
          <Routes>
            <Route path="/" element={<NGOHomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/ngo/dashboard" element={<NGOHomePage />} />
            <Route path="/ngo/profile" element={<NGOProfile />} />
            <Route path="/ngo/complains" element={<SeeComplains />} />

            {/* Notice */}
            <Route path="/ngo/addnotice" element={<AddNotice />} />
            <Route path="/ngo/notices" element={<ShowNotices />} />

            {/* Subject */}
            <Route path="/ngo/subjects" element={<ShowSubjects />} />
            <Route
              path="/ngo/subjects/subject/:classID/:subjectID"
              element={<ViewSubject />}
            />
            <Route
              path="/ngo/subjects/chooseclass"
              element={<ChooseClass situation="Subject" />}
            />

            <Route path="/ngo/addsubject/:id" element={<SubjectForm />} />
            <Route
              path="/ngo/class/subject/:classID/:subjectID"
              element={<ViewSubject />}
            />

            <Route
              path="/ngo/subject/student/attendance/:studentID/:subjectID"
              element={<StudentAttendance situation="Subject" />}
            />
            <Route
              path="/ngo/subject/student/marks/:studentID/:subjectID"
              element={<StudentExamMarks situation="Subject" />}
            />

            {/* Class */}
            <Route path="/ngo/addclass" element={<AddClass />} />
            <Route path="/ngo/classes" element={<ShowClasses />} />
            <Route path="/ngo/classes/class/:id" element={<ClassDetails />} />
            <Route
              path="/ngo/class/addstudents/:id"
              element={<AddStudent situation="Class" />}
            />

            {/* Student */}
            <Route
              path="/ngo/addstudents"
              element={<AddStudent situation="Student" />}
            />
            <Route path="/ngo/students" element={<ShowStudents />} />
            <Route path="/ngo/students/student/:id" element={<ViewStudent />} />
            <Route
              path="/ngo/students/student/attendance/:id"
              element={<StudentAttendance situation="Student" />}
            />
            <Route
              path="/ngo/students/student/marks/:id"
              element={<StudentExamMarks situation="Student" />}
            />

            {/* Teacher */}
            <Route path="/ngo/teachers" element={<ShowTeachers />} />
            <Route
              path="/ngo/teachers/teacher/:id"
              element={<TeacherDetails />}
            />
            <Route
              path="/ngo/teachers/chooseclass"
              element={<ChooseClass situation="Teacher" />}
            />
            <Route
              path="/ngo/teachers/choosesubject/:id"
              element={<ChooseSubject situation="Norm" />}
            />
            <Route
              path="/ngo/teachers/choosesubject/:classID/:teacherID"
              element={<ChooseSubject situation="Teacher" />}
            />
            <Route
              path="/ngo/teachers/addteacher/:id"
              element={<AddTeacher />}
            />
            <Route path="/ngo/addfacility" element={<AddFacility />} />

            <Route path="/noticeDetail" element={<NoticeDetail />} />

            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default NGODashboard;

const styles = {
  boxStyled: {
    backgroundColor: (theme) =>
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    height: "99.9vh",
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
    // overflowX: "hidden",
  },
  hideDrawer: {
    display: "flex",
    // overflow: "hidden",
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
};
