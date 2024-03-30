import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Homepage from "./pages/Homepage";
import NGODashboard from "./pages/ngo/NGODashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import LoginPage from "./pages/LoginPage";
import NGORegisterPage from "./pages/ngo/NGORegisterPage";
import ChooseUser from "./pages/ChooseUser";
import AdminDashboard from "./pages/admin/adminDasboard";
import NoticeDetail from "./pages/noticeDetail";
import Dashboard from "./pages/admin/Dashboard";

const App = () => {
  const { currentRole } = useSelector((state) => state.user);

  return (
    <Router>
      {currentRole === null && (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/choose" element={<ChooseUser visitor="normal" />} />
          <Route
            path="/chooseasguest"
            element={<ChooseUser visitor="guest" />}
          />
          <Route path="/adminDashboard" element={<Dashboard />} />

          <Route path="/adminlogin" element={<LoginPage role="Admin" />} />
          <Route path="/NGOlogin" element={<LoginPage role="NGO" />} />
          {/* <Route path="/Studentlogin" element={<LoginPage role="Student" />} /> */}
          <Route path="/Teacherlogin" element={<LoginPage role="Teacher" />} />

          <Route path="/NGOregister" element={<NGORegisterPage />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}

      {currentRole === "admin" && (
        <>
          <AdminDashboard />
        </>
      )}
      {currentRole === "NGO" && (
        <>
          <NGODashboard />
        </>
      )}

      {currentRole === "Student" && (
        <>
          <StudentDashboard />
        </>
      )}

      {currentRole === "Teacher" && (
        <>
          <TeacherDashboard />
        </>
      )}
    </Router>
  );
};

export default App;
