import React, { useEffect, useState } from "react";
import Eye from "../../assets/eye.png";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getAllNgo, removeNgo } from "../../redux/ngoRelated/ngoHandle";
import { useNavigate } from "react-router-dom";
import { setNgoId } from "../../redux/selectedDataRelated/selectedDataHandler";
import Popup from "../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Modal } from "@mui/material";
import AddNgo from "./addNgo";
import { updateNgo } from "../../redux/ngoRelated/ngoHandle";
import "./admin.css";

const AllNgoPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const classes = useStyles();
  const { ngoList } = useSelector((state) => state.ngo);
  const [ngos, setNgos] = useState(ngoList);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showEditNgo, setShowEditNgo] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  useEffect(() => {
    console.log("dispatching");
    dispatch(getAllNgo());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleView = (id) => {
    dispatch(setNgoId(id));
    navigate("/admin/ngoDetails");
  };
  const deleteNgo = (ngoId) => {
    dispatch(
      removeNgo(
        ngoId,
        (callback) => {
          if (callback === "success") {
            setMessage("deleted successfully");
          } else {
            setMessage("Try again");
          }
          setShowPopup(true);
        },
        (onError) => {
          setMessage("something went wrong");
          setShowPopup(true);
        }
      )
    );
  };
  const handleClose = () => {
    setShowEditNgo(false);
  };
  const handleEdit = (item) => {
    setSelectedData(item);
    setShowEditNgo(true);
  };
  const handleUpdate = (payload, resetPayload) => {
    console.log("payload is ", payload);
    // setPayload({ ...payload, ngoId: data._id });

    dispatch(
      updateNgo(
        payload,
        (callback) => {
          console.log("update successfully");
          setMessage("Update successfully");
          setShowPopup(true);
          resetPayload();
          setShowEditNgo(false);
        },
        (onError) => {
          setMessage("try again, something went wrong");
          console.log("get error", onError);
          setShowPopup(true);
          // modalClose();
        }
      )
    );
  };
  return (
    <>
      <div
        className="mt-3 d-flex"
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "blue",
          height: "86.5vh",
        }}
      >
        <div className="input-group w-50 m-auto">
          <input
            type="text"
            className="form-control py-2 mb-1"
            placeholder="Search ngo ..."
            aria-label="Search"
            value={search}
            onChange={handleSearch}
            aria-describedby="basic-addon1"
          />
        </div>
        <div
          className="col-lg-11 col-sm-11 col-11 col-md-11 m-auto"
          style={{
            height: "75vh",
            // backgroundColor: "red",
            // width: "80%",
            overflowY: "auto",
            margin: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#1976d2 transparent",
            WebkitScrollSnapType: "none",
            scrollPadding: "0px",
            scrollBehavior: "smooth",
            scrollbarArrowColor: "transparent",
          }}
        >
          <div className="collection-table mt-4 table-other">
            <table className="table table-hover align-middle text-center">
              <thead>
                <tr className="align-middle">
                  <th>View Details</th>
                  <th className="">Name</th>
                  <th className="">Email</th>
                  <th className="">School</th>
                  <th className="">Trustee</th>
                  <th className="">Address</th>
                  <th className="">Actions</th>
                </tr>
              </thead>
              <tbody>
                {search !== "" ? (
                  <>
                    {ngoList
                      .filter((item) =>
                        item.name.toLowerCase().includes(search.toLowerCase())
                      )
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
                                <b>
                                  {" "}
                                  {item.name
                                    ? `${item.name.substring(0, 15)}${
                                        item.name.length > 15 ? "..." : ""
                                      }`
                                    : ""}
                                </b>
                              </span>
                            </td>
                            <td scope="col">
                              <b>
                                {" "}
                                {item.email
                                  ? `${item.email.substring(0, 12)}${
                                      item.email.length > 12 ? "..." : ""
                                    }`
                                  : ""}
                              </b>
                            </td>
                            <td scope="col">
                              <b>
                                {" "}
                                {item.schoolName
                                  ? `${item.schoolName.substring(0, 12)}${
                                      item.schoolName.length > 12 ? "..." : ""
                                    }`
                                  : ""}
                              </b>
                            </td>
                            <td scope="col" className="text-success">
                              <b>
                                {" "}
                                {item.trustee
                                  ? `${item.trustee.substring(0, 12)}${
                                      item.trustee.length > 12 ? "..." : ""
                                    }`
                                  : ""}
                              </b>
                            </td>
                            <td scope="col" className="text-success">
                              <b>
                                {item.address
                                  ? `${item.address.substring(0, 15)}${
                                      item.address.length > 15 ? "..." : ""
                                    }`
                                  : ""}
                              </b>
                            </td>
                            <td scope="col" className="text-success">
                              <span
                                className="btn"
                                onClick={() => deleteNgo(item._id)}
                              >
                                {<DeleteIcon color="error" />}
                              </span>
                              <span
                                className="btn"
                                onClick={() => handleEdit(item)}
                              >
                                {<BorderColorIcon color="primary" />}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </>
                ) : (
                  <>
                    {ngoList
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
                                <b>
                                  {" "}
                                  {item.name
                                    ? `${item.name.substring(0, 15)}${
                                        item.name.length > 15 ? "..." : ""
                                      }`
                                    : ""}
                                </b>
                              </span>
                            </td>
                            <td scope="col">
                              <b>
                                {" "}
                                {item.email
                                  ? `${item.email.substring(0, 12)}${
                                      item.email.length > 12 ? "..." : ""
                                    }`
                                  : ""}
                              </b>
                            </td>
                            <td scope="col">
                              <b>
                                {" "}
                                {item.schoolName
                                  ? `${item.schoolName.substring(0, 12)}${
                                      item.schoolName.length > 12 ? "..." : ""
                                    }`
                                  : ""}
                              </b>
                            </td>
                            <td scope="col" className="text-success">
                              <b>
                                {" "}
                                {item.trustee
                                  ? `${item.trustee.substring(0, 12)}${
                                      item.trustee.length > 12 ? "..." : ""
                                    }`
                                  : ""}
                              </b>
                            </td>
                            <td scope="col" className="text-success">
                              <b>
                                {item.address
                                  ? `${item.address.substring(0, 15)}${
                                      item.address.length > 15 ? "..." : ""
                                    }`
                                  : ""}
                              </b>
                            </td>
                            <td scope="col" className="text-success">
                              <span
                                className="btn"
                                onClick={() => deleteNgo(item._id)}
                              >
                                {<DeleteIcon color="error" />}
                              </span>
                              <span
                                className="btn"
                                onClick={() => handleEdit(item)}
                              >
                                {<BorderColorIcon color="primary" />}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </>
                )}
              </tbody>
            </table>
          </div>
          <div className="d-inline-flex justify-content-end mb-5 p-3 w-100">
            <div className="">
              <Pagination
                style={{ alignSelf: "center" }}
                count={
                  search === ""
                    ? ngoList.length % 6 === 0
                      ? parseInt(ngoList.length / 6)
                      : parseInt(ngoList.length / 6) + 1
                    : ngoList.filter((item) =>
                        item.name.toLowerCase().includes(search.toLowerCase())
                      ).length %
                        6 ===
                      0
                    ? parseInt(
                        ngoList.filter((item) =>
                          item.name.toLowerCase().includes(search.toLowerCase())
                        ).length / 6
                      )
                    : parseInt(
                        ngoList.filter((item) =>
                          item.name.toLowerCase().includes(search.toLowerCase())
                        ).length / 6
                      ) + 1
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
        </div>
      </div>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
      <Modal
        open={showEditNgo}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            width: "100%",
            height: "99.8vh",
            background: "transparent",
            overflowY: "scroll",
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <div
            style={{
              width: "80%",
              margin: "auto",
              backgroundColor: "transparent",
              overflowY: "hidden",
            }}
          >
            <AddNgo
              edit={true}
              modalClose={() => setShowEditNgo(false)}
              data={selectedData}
              handleUpdateNgo={handleUpdate}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AllNgoPage;
