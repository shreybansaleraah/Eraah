import React, { useEffect, useState } from "react";
import {
  getClassStudents,
  getSubjectDetails,
} from "../../../redux/sclassRelated/sclassHandle";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Tab,
  Container,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import {
  BlueButton,
  GreenButton,
  PurpleButton,
} from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import InsertChartIcon from "@mui/icons-material/InsertChart";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import TableChartIcon from "@mui/icons-material/TableChart";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";

const ViewSubject = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse, error } =
    useSelector((state) => state.sclass);

  const { classID, subjectID } = params;

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  if (error) {
    console.log(error);
  }

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [selectedSection, setSelectedSection] = useState("attendance");
  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const studentColumns = [
    { id: "rollNum", label: "Roll No.", minWidth: 100 },
    { id: "name", label: "Name", minWidth: 170 },
  ];

  const studentRows = sclassStudents.map((student) => {
    return {
      rollNum: student.rollNum,
      name: student.name,
      id: student._id,
    };
  });

  const StudentsAttendanceButtonHaver = ({ row }) => {
    return (
      <>
        <BlueButton
          variant="contained"
          onClick={() => navigate("/ngo/students/student/" + row.id)}
        >
          View
        </BlueButton>
        <PurpleButton
          variant="contained"
          onClick={() =>
            navigate(`/ngo/subject/student/attendance/${row.id}/${subjectID}`)
          }
        >
          Take Attendance
        </PurpleButton>
      </>
    );
  };

  const StudentsMarksButtonHaver = ({ row }) => {
    return (
      <>
        <BlueButton
          variant="contained"
          onClick={() => navigate("/ngo/students/student/" + row.id)}
        >
          View
        </BlueButton>
        <PurpleButton
          variant="contained"
          onClick={() =>
            navigate(`/ngo/subject/student/marks/${row.id}/${subjectID}`)
          }
        >
          Provide Marks
        </PurpleButton>
      </>
    );
  };

  const SubjectStudentsSection = () => {
    return (
      <>
        {getresponse ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              <GreenButton
                variant="contained"
                onClick={() => navigate("/ngo/class/addstudents/" + classID)}
              >
                Add Students
              </GreenButton>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Students List:
            </Typography>

            {selectedSection === "attendance" && (
              <TableTemplate
                buttonHaver={StudentsAttendanceButtonHaver}
                columns={studentColumns}
                rows={studentRows}
              />
            )}
            {selectedSection === "marks" && (
              <TableTemplate
                buttonHaver={StudentsMarksButtonHaver}
                columns={studentColumns}
                rows={studentRows}
              />
            )}

            <Paper
              sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
              elevation={3}
            >
              <BottomNavigation
                value={selectedSection}
                onChange={handleSectionChange}
                showLabels
              >
                <BottomNavigationAction
                  label="Attendance"
                  value="attendance"
                  icon={
                    selectedSection === "attendance" ? (
                      <TableChartIcon />
                    ) : (
                      <TableChartOutlinedIcon />
                    )
                  }
                />
                <BottomNavigationAction
                  label="Marks"
                  value="marks"
                  icon={
                    selectedSection === "marks" ? (
                      <InsertChartIcon />
                    ) : (
                      <InsertChartOutlinedIcon />
                    )
                  }
                />
              </BottomNavigation>
            </Paper>
          </>
        )}
      </>
    );
  };

  const SubjectDetailsSection = () => {
    const numberOfStudents = sclassStudents.length;

    return (
      <div className="bg-white rounded shadow p-4 d-flex flex-column justify-content-center align-items-center text-start">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ textDecoration: "underline" }}
          className="mb-3"
        >
          Subject Details
        </Typography>
        <Typography variant="h6" gutterBottom>
          Subject Name :{" "}
          <span style={{ color: "#1976d2" }}>
            {subjectDetails && subjectDetails.subName}
          </span>
        </Typography>
        <Typography variant="h6" gutterBottom>
          Subject Code : {subjectDetails && subjectDetails.subCode}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Subject Sessions : {subjectDetails && subjectDetails.sessions}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Number of Students: {numberOfStudents}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Class Name :{" "}
          {subjectDetails &&
            subjectDetails.sclassName &&
            subjectDetails.sclassName.sclassName}
        </Typography>
        {subjectDetails && subjectDetails.teacher ? (
          <Typography variant="h6" gutterBottom>
            Teacher Name : {subjectDetails.teacher.name}
          </Typography>
        ) : (
          <GreenButton
            variant="contained"
            onClick={() =>
              navigate("/ngo/teachers/addteacher/" + subjectDetails._id)
            }
          >
            Add Subject Teacher
          </GreenButton>
        )}
      </div>
    );
  };

  return (
    <>
      {subloading ? (
        <div> Loading...</div>
      ) : (
        <>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "#f5f5f5" }}>
                <TabList
                  onChange={handleChange}
                  sx={{
                    // position: "fixed",
                    width: "90%",
                    bgcolor: "",
                    zIndex: 1,
                  }}
                >
                  <Tab label="Details" value="1" />
                  <Tab label="Students" value="2" />
                </TabList>
              </Box>
              <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                <TabPanel value="1">
                  <SubjectDetailsSection />
                </TabPanel>
                <TabPanel value="2">
                  <SubjectStudentsSection />
                </TabPanel>
              </Container>
            </TabContext>
          </Box>
        </>
      )}
    </>
  );
};

export default ViewSubject;
