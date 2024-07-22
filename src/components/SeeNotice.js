import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotices,
  getAllNoticesOnDashboard,
} from "../redux/noticeRelated/noticeHandle";
import { Paper } from "@mui/material";
import TableViewTemplate from "./TableViewTemplate";
import { BlueButton } from "./buttonStyles";
import TableTemplate from "./TableTemplate";
import { useNavigate } from "react-router-dom";
const SeeNotice = ({ ngoId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, currentRole } = useSelector((state) => state.user);
  const { noticesList, loading, error, response } = useSelector(
    (state) => state.notice
  );

  useEffect(() => {
    if (currentRole === "NGO") {
      dispatch(getAllNotices(currentUser._id, "Notice"));
    } else if (currentRole !== "admin") {
      dispatch(getAllNotices(currentUser.school._id, "Notice"));
    } else if (ngoId) {
      dispatch(getAllNotices(ngoId, "Notice"));
    } else {
      dispatch(getAllNoticesOnDashboard(currentUser._id));
    }
  }, [dispatch]);

  if (error) {
    console.log(error);
  }

  const noticeColumns = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "description", label: "Description", minWidth: 100 },
    { id: "school", label: "School", minWidth: 100 },
    { id: "date", label: "Date", minWidth: 170 },
    { id: "entryFee", label: "Entry Fee", minWidth: 100 },
  ];

  const noticeRows = noticesList.map((notice) => {
    const date = new Date(notice.date);
    const dateString =
      date.toString() !== "Invalid Date"
        ? date.toISOString().substring(0, 10)
        : "Invalid Date";
    return {
      title: notice.title,
      description: (notice.description || "").substring(0, 10),
      school: notice?.school?.schoolName || "",
      date: dateString,
      entryFee: "₹ " + notice.entryFee,
      id: notice._id,
    };
  });
  const ButtonHaver = ({ row }) => {
    return (
      <>
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

  return (
    <div style={{ marginTop: "50px", marginRight: "20px" }}>
      {loading ? (
        <div style={{ fontSize: "20px" }}>Loading...</div>
      ) : response ? (
        <div style={{ fontSize: "20px" }}>No Notices to Show Right Now</div>
      ) : (
        <>
          <h3 style={{ fontSize: "30px", marginBottom: "40px" }}>Notices</h3>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            {Array.isArray(noticesList) && noticesList.length > 0 && (
              <TableTemplate
                buttonHaver={ButtonHaver}
                columns={noticeColumns}
                rows={noticeRows}
              />
              // <TableViewTemplate
              //   buttonHaver={ButtonHaver}
              //   columns={noticeColumns}
              //   rows={noticeRows}
              // />
            )}
          </Paper>
        </>
      )}
    </div>
  );
};

export default SeeNotice;
