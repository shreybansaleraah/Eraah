import { useEffect, useState } from "react";
import {
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import {
  getAllSclasses,
  removeSclasse,
} from "../../../redux/sclassRelated/sclassHandle";
import { BlueButton, GreenButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";

import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddCardIcon from "@mui/icons-material/AddCard";
import styled from "styled-components";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import Eye from "../../../assets/eye.png";
import Pagination from "@mui/material/Pagination";
import { setclass } from "../../../redux/selectedDataRelated/selectedDataHandler";
const ShowClasses = ({ setSubTab }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const { sclassesList, loading, error, getresponse } = useSelector(
    (state) => state.sclass
  );
  const { selectedNgoId } = useSelector((state) => state.selectedUser);

  // const ngoId = ;

  useEffect(() => {
    dispatch(getAllSclasses(selectedNgoId, "Sclass"));
  }, [selectedNgoId, dispatch]);

  if (error) {
    console.log(error);
  }

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID);
    console.log(address);
    // setMessage("Sorry the delete function has been disabled for now.")
    // setShowPopup(true)
    dispatch(removeSclasse(deleteID)).then(() => {
      dispatch(getAllSclasses(selectedNgoId, "Sclass"));
    });
  };

  const sclassColumns = [{ id: "name", label: "Class Name", minWidth: 170 }];

  const sclassRows =
    sclassesList &&
    sclassesList.length > 0 &&
    sclassesList.map((sclass) => {
      return {
        name: sclass.sclassName,
        id: sclass._id,
      };
    });

  const SclassButtonHaver = ({ row }) => {
    const actions = [
      {
        icon: <PostAddIcon />,
        name: "Add Subjects",
        action: () => navigate("/admin/addsubject/" + row.id),
      },
      {
        icon: <PersonAddAlt1Icon />,
        name: "Add Student",
        action: () => navigate("/admin/class/addstudents/" + row.id),
      },
    ];
    return (
      <ButtonContainer>
        <IconButton
          onClick={() => deleteHandler(row.id, "Sclass")}
          color="secondary"
        >
          <DeleteIcon color="error" />
        </IconButton>
        <BlueButton
          variant="contained"
          onClick={() => navigate("/admin/classes/class/" + row.id)}
        >
          View
        </BlueButton>
        {/* <ActionMenu actions={actions} /> */}
      </ButtonContainer>
    );
  };

  const handleView = (classId) => {
    dispatch(setclass(classId));
    setSubTab("selectedClass");
  };
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* {getresponse ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              <GreenButton
                variant="contained"
                onClick={() => navigate("/admin/addclass")}
              >
                Add Class
              </GreenButton>
            </Box>
          ) : (
            <>
              {Array.isArray(sclassesList) && sclassesList.length > 0 && (
                <TableTemplate
                  buttonHaver={SclassButtonHaver}
                  columns={sclassColumns}
                  rows={sclassRows}
                />
              )}
              {/* <SpeedDialTemplate actions={actions} /> */}
          {/* </> */}
          {/* )} */}
          <div className="collection-table mt-4 table-other col-lg-11 col-sm-11 col-md-11 col-11 m-auto">
            <table className="table table-hover align-middle text-center">
              <thead>
                <tr className="align-middle">
                  <th>View Details</th>
                  <th className="">Class Name</th>
                </tr>
              </thead>
              <tbody>
                {sclassesList
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
                            <b>{item.sclassName || ""}</b>
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
                  sclassesList.length % 6 === 0
                    ? parseInt(sclassesList.length / 6)
                    : parseInt(sclassesList.length / 6) + 1
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
      )}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default ShowClasses;

const styles = {
  styledPaper: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
