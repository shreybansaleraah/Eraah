import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getClassDetails,
  getClassStudents,
  getSubjectList,
} from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import { Box, Container, Typography, Tab, IconButton } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { resetSubjects } from "../../../redux/sclassRelated/sclassSlice";
import {
  BlueButton,
  GreenButton,
  PurpleButton,
} from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from "@mui/icons-material/PostAdd";

import Eye from "../../../assets/eye.png";
import Pagination from "@mui/material/Pagination";
import "../admin.css";
import { setChildId } from "../../../redux/selectedDataRelated/selectedDataHandler";
const ClassDetails = ({ setSubTab }) => {
  const params = useParams();
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    subjectsList,
    sclassStudents,
    sclassDetails,
    loading,
    error,
    response,
    getresponse,
  } = useSelector((state) => state.sclass);

  const classID = useSelector((state) => state.selectedUser.selectedClass);

  useEffect(() => {
    dispatch(getClassDetails(classID, "Sclass"));
    dispatch(getSubjectList(classID, "ClassSubjects"));
    dispatch(getClassStudents(classID));
  }, [dispatch, classID]);

  if (error) {
    console.log(error);
  }

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleView = (childId) => {
    // setValue(newValue);
    dispatch(setChildId(childId));
    setSubTab("selectedStudent");
  };

  const ClassSubjectsSection = () => {
    return (
      <>
        <div className="collection-table mt-4 table-other col-lg-11 col-sm-11 col-md-11 col-11 m-auto">
          <table className="table table-hover align-middle text-center">
            <thead>
              <tr className="align-middle">
                <th>Subject Name</th>
                <th className="">Subject Code</th>
                <th className="">Session</th>
              </tr>
            </thead>
            <tbody>
              {subjectsList.map((item, index) => {
                console.log("item is : ", item);
                return (
                  <tr key={index} style={{ borderBottom: "none" }}>
                    <td scope="col">
                      <span id="comment">
                        <b>{item.subName || ""}</b>
                      </span>
                    </td>
                    <td scope="col">
                      <span id="comment">
                        <b>{item.subCode || ""}</b>
                      </span>
                    </td>
                    <td scope="col">
                      <span id="comment">
                        <b>{item.sessions || ""}</b>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const ClassStudentsSection = () => {
    return (
      <>
        <div className="collection-table mt-4 table-other">
          <table className="table table-hover align-middle text-center">
            <thead>
              <tr className="align-middle">
                <th>View Details</th>
                <th className="">Name</th>
                <th className="">Class</th>
                <th className="">Roll No.</th>
                <th className="">Father Name</th>
              </tr>
            </thead>
            <tbody>
              {sclassStudents
                .slice(6 * (page - 1), 6 * page)
                .map((item, index) => {
                  console.log("item is : ", item);
                  return (
                    <tr key={index} style={{ borderBottom: "none" }}>
                      <td>
                        <img
                          onClick={() => {
                            handleView(item._id);
                          }}
                          className="hoverCusrsor"
                          src={Eye}
                          width={20}
                          height={20}
                          alt=""
                        />
                      </td>
                      <td scope="col">
                        <span id="comment">
                          <b>{item.name || ""}</b>
                        </span>
                      </td>
                      <td scope="col">
                        <span id="comment">
                          <b>{item.name || ""}</b>
                        </span>
                      </td>
                      <td scope="col">
                        <span id="comment">
                          <b>{item.name || ""}</b>
                        </span>
                      </td>
                      <td scope="col">
                        <span id="comment">
                          <b>{item.name || ""}</b>
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="d-inline-flex justify-content-end mb-5 p-3 w-100">
          <div className="">
            <Pagination
              style={{ alignSelf: "center" }}
              count={
                sclassStudents.length % 6 === 0
                  ? parseInt(sclassStudents.length / 6)
                  : parseInt(sclassStudents.length / 6) + 1
              }
              color="primary"
              shape="circular"
              onChange={(event, value) => {
                console.log(value);
                setPage(value);
              }}
              defaultValue={1}
              page={page}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Box className="my-4" sx={{ typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "#f5f5f5" }}>
                <TabList
                  onChange={handleChange}
                  sx={{
                    width: "90%",
                    margin: "auto",
                    bgcolor: "",
                    // zIndex: 1,
                  }}
                >
                  <Tab label="Subjects" value="1" />
                  <Tab label="Students" value="2" />
                </TabList>
              </Box>
              <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                <TabPanel value="1">
                  <ClassSubjectsSection />
                </TabPanel>
                <TabPanel value="2">
                  <ClassStudentsSection />
                </TabPanel>
              </Container>
            </TabContext>
          </Box>
        </>
      )}
    </>
  );
};

export default ClassDetails;
