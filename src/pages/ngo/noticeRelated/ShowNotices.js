import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Paper, Box, IconButton } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllNotices } from "../../../redux/noticeRelated/noticeHandle";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import TableTemplate from "../../../components/TableTemplate";
import { GreenButton } from "../../../components/buttonStyles";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
// import EYE from "../../../assets/eye.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { BlueButton } from "../../../components/buttonStyles";

const ShowNotices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { noticesList, loading, error, response } = useSelector(
    (state) => state.notice
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllNotices(currentUser._id, "Notice"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const deleteHandler = (deleteID, address) => {
    dispatch(deleteUser(deleteID, address)).then(() => {
      dispatch(getAllNotices(currentUser._id, "Notice"));
    });
  };

  const noticeColumns = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "description", label: "Description", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 170 },
    { id: "entryFee", label: "Entry Fee", minWidth: 100 },
  ];

  const noticeRows =
    noticesList &&
    noticesList.length > 0 &&
    noticesList.map((notice) => {
      const date = new Date(notice.date);
      const dateString =
        date.toString() !== "Invalid Date"
          ? date.toISOString().substring(0, 10)
          : "Invalid Date";
      return {
        title: notice.title,
        description: (notice.description || "").substring(0, 10),
        date: dateString,
        entryFee: "₹ " + notice.entryFee,
        id: notice._id,
      };
    });

  const NoticeButtonHaver = ({ row }) => {
    return (
      <>
        <IconButton onClick={() => deleteHandler(row.id, "Notice")}>
          <DeleteIcon color="error" />
        </IconButton>
        <IconButton onClick={() => {}}>
          <VisibilityIcon color="#1976d2" />
        </IconButton>
        <BlueButton
          variant="contained"
          onClick={() => {
            navigate("/noticeDetail", {
              state: { data: noticesList.find((item) => item._id === row.id) },
            });
            console.log(
              "row is : ",
              noticesList.find((item) => item._id === row.id)
            );
          }}
        >
          View
        </BlueButton>
      </>
    );
  };

  const actions = [
    {
      icon: <NoteAddIcon color="primary" />,
      name: "Add New Notice",
      action: () => navigate("/ngo/addnotice"),
    },
    {
      icon: <DeleteIcon color="error" />,
      name: "Delete All Notices",
      action: () => deleteHandler(currentUser._id, "Notices"),
    },
  ];

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {response ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              <GreenButton
                variant="contained"
                onClick={() => navigate("/ngo/addnotice")}
              >
                Add Notice
              </GreenButton>
            </Box>
          ) : (
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              {Array.isArray(noticesList) && noticesList.length > 0 && (
                <TableTemplate
                  buttonHaver={NoticeButtonHaver}
                  columns={noticeColumns}
                  rows={noticeRows}
                />
              )}
              <SpeedDialTemplate actions={actions} />
            </Paper>
          )}
        </>
      )}
    </>
  );
};

export default ShowNotices;
