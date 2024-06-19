import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllTeachers,
  removeTeacher,
} from "../../../redux/teacherRelated/teacherHandle";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { StyledTableCell, StyledTableRow } from "../../../components/styles";
import { BlueButton, GreenButton } from "../../../components/buttonStyles";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import UploadCsv from "../../../components/uploadCsv/uploadCsv";

import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const ShowTeachers = () => {
  const [page, setPage] = useState(0);
  const [csvTab, setCsvTab] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { teachersList, loading, error, response } = useSelector(
    (state) => state.teacher
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllTeachers(currentUser._id));
  }, [currentUser._id, dispatch]);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID);
    console.log(address);
    // setMessage("Sorry the delete function has been disabled for now.")
    // setShowPopup(true)

    dispatch(removeTeacher(deleteID)).then(() => {
      dispatch(getAllTeachers(currentUser._id));
    });
  };

  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "teachSubject", label: "Subject", minWidth: 100 },
    { id: "teachSclass", label: "Class", minWidth: 170 },
  ];

  const rows = teachersList.map((teacher) => {
    return {
      name: teacher.name,
      teachSubject: teacher?.teachSubject || null,
      teachSclass: teacher.teachSclass || null,
      teachSclassID: teacher.teachSclass._id,
      id: teacher?._id || null,
    };
  });

  const actions = [
    {
      icon: <InsertDriveFileIcon color="success" />,
      name: "Add via csv",
      action: () => setCsvTab(true),
    },
    {
      icon: <PersonAddAlt1Icon color="primary" />,
      name: "Add New Teacher",
      action: () => navigate("/ngo/teachers/chooseclass"),
    },
    {
      icon: <PersonRemoveIcon color="error" />,
      name: "Delete All Teachers",
      action: () => deleteHandler(currentUser._id, "Teachers"),
    },
  ];

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : csvTab ? (
        <UploadCsv
          onBack={() => {
            setCsvTab(false);
          }}
          actionFor={"teacher"}
        />
      ) : response ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "16px",
          }}
        >
          <GreenButton
            variant="contained"
            onClick={() => navigate("/ngo/teachers/chooseclass")}
          >
            Add Teacher
          </GreenButton>
          <GreenButton variant="contained mx-2" onClick={() => setCsvTab(true)}>
            Add Teacher via csv
          </GreenButton>
        </Box>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <StyledTableRow>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <StyledTableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];

                          if (column.id === "teachSubject") {
                            return (
                              <StyledTableCell
                                key={column.id}
                                align={column.align}
                              >
                                {
                                  value != null && value.length > 0
                                    ? value.map((subject, idx) => {
                                        return (
                                          subject.subName +
                                          `${
                                            idx === value.length - 1 ? "" : ","
                                          }`
                                        );
                                      })
                                    : "No Subject Found"
                                  // <Button
                                  //   variant="contained"
                                  //   onClick={() => {
                                  //     navigate(
                                  //       `/ngo/teachers/choosesubject/${row.teachSclassID}/${row.id}`
                                  //     );
                                  //   }}
                                  // >
                                  //   Add Subject
                                  // </Button>
                                }
                              </StyledTableCell>
                            );
                          } else if (column.id === "teachSclass") {
                            return (
                              <StyledTableCell
                                key={column.id}
                                align={column.align}
                              >
                                {
                                  value != null && value.length > 0
                                    ? value.map((className, idx) => {
                                        return (
                                          className.sclassName +
                                          `${
                                            idx === value.length - 1 ? "" : ","
                                          }`
                                        );
                                      })
                                    : "No Class Found"
                                  // <Button
                                  //   variant="contained"
                                  //   onClick={() => {
                                  //     navigate(
                                  //       `/ngo/teachers/choosesubject/${row.teachSclassID}/${row.id}`
                                  //     );
                                  //   }}
                                  // >
                                  //   Add Subject
                                  // </Button>
                                }
                              </StyledTableCell>
                            );
                          }
                          return (
                            <StyledTableCell
                              key={column.id}
                              align={column.align}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </StyledTableCell>
                          );
                        })}
                        <StyledTableCell align="center">
                          <IconButton
                            onClick={() => deleteHandler(row.id, "Teacher")}
                          >
                            <PersonRemoveIcon color="error" />
                          </IconButton>
                          <BlueButton
                            variant="contained"
                            onClick={() =>
                              navigate("/ngo/teachers/teacher/" + row.id)
                            }
                          >
                            View
                          </BlueButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 5));
              setPage(0);
            }}
          />

          <SpeedDialTemplate actions={actions} />
          <Popup
            message={message}
            setShowPopup={setShowPopup}
            showPopup={showPopup}
          />
        </Paper>
      )}
    </>
  );
};

export default ShowTeachers;
