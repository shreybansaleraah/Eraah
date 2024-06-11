import React, { useEffect, useState } from "react";
import Eye from "../../../assets/eye.png";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import Popup from "../../../components/Popup";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Modal } from "@mui/material";
import AddNgo from "../addNgo";
import "../admin.css";
import {
  deleteBlogById,
  getBlogs,
  updateBlog,
} from "../../../utils/api-factory";
import AddBlog from "./addBlog";

function AllBlogs() {
  const navigate = useNavigate();

  // const classes = useStyles();
  //  const { ngoList } = useSelector((state) => state.ngo);
  const [blogs, setBlogs] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showEditBlog, setShowEditBlog] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const fetchData = () => {
    getBlogs(
      (callback) => {
        setBlogs(callback.data);
      },
      (onError) => {
        setMessage(onError.response.data.message ?? "something went wrong");
        setShowPopup(true);
      }
    );
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleView = (id) => {
    // dispatch(setNgoId(id));
    console.log(`redirection with ${id}`);
    navigate("/admin/blogDetail", { state: id });
  };
  const deleteBlog = (blogId) => {
    deleteBlogById(
      { id: blogId },
      (callback) => {
        setMessage("deleted successfully");
        fetchData();
        setShowPopup(true);
      },
      (onError) => {
        setMessage(onError.response.data.message ?? "something went wrong");
        setShowPopup(true);
      }
    );
  };
  const handleClose = () => {
    setShowEditBlog(false);
  };
  const handleEdit = (item) => {
    setSelectedData(item);
    setShowEditBlog(true);
  };
  const handleUpdate = (payload, resetPayload) => {
    console.log("payload is ", payload);
    updateBlog(
      selectedData._id,
      payload,
      (callback) => {
        setMessage("successfully added");
        setShowPopup(true);
        resetPayload();
        fetchData();
        setShowEditBlog(false);
      },
      (onError) => {
        setMessage(onError.response.data.message ?? "something went wrong");
        setShowPopup(true);
      }
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
          position: "relative",
          height: "86.5vh",
        }}
      >
        <div className="input-group w-50 m-auto">
          <input
            type="text"
            className="form-control py-2 mb-1"
            placeholder="Search blog ..."
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
                  <th className="">title</th>

                  <th className="">Actions</th>
                </tr>
              </thead>
              <tbody>
                {search !== "" ? (
                  <>
                    {blogs
                      .filter((item) =>
                        item.title.toLowerCase().includes(search.toLowerCase())
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
                                  {item.title
                                    ? `${item.title.substring(0, 30)}${
                                        item.title.length > 30 ? "..." : ""
                                      }`
                                    : ""}
                                </b>
                              </span>
                            </td>
                            {/* <td scope="col">
                              <b>
                                {" "}
                                {item.content
                                  ? `${item.content.substring(0, 12)}${
                                      item.content.length > 12 ? "..." : ""
                                    }`
                                  : ""}
                              </b>
                            </td> */}

                            <td scope="col" className="text-success">
                              <span
                                className="btn"
                                onClick={() => deleteBlog(item._id)}
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
                    {blogs
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
                                  {item.title
                                    ? `${item.title.substring(0, 15)}${
                                        item.title.length > 15 ? "..." : ""
                                      }`
                                    : ""}
                                </b>
                              </span>
                            </td>
                            {/* <td scope="col">
                              <b>
                                {" "}
                                {item.content
                                  ? `${item.content.substring(0, 12)}${
                                      item.content.length > 12 ? "..." : ""
                                    }`
                                  : ""}
                              </b>
                            </td> */}

                            <td scope="col" className="text-success">
                              <span
                                className="btn"
                                onClick={() => deleteBlog(item._id)}
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
                    ? blogs.length % 6 === 0
                      ? parseInt(blogs.length / 6)
                      : parseInt(blogs.length / 6) + 1
                    : blogs.filter((item) =>
                        item.title.toLowerCase().includes(search.toLowerCase())
                      ).length %
                        6 ===
                      0
                    ? parseInt(
                        blogs.filter((item) =>
                          item.title
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ).length / 6
                      )
                    : parseInt(
                        blogs.filter((item) =>
                          item.title
                            .toLowerCase()
                            .includes(search.toLowerCase())
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
      <div style={{ position: "absolute", top: "5.5rem", right: "1rem" }}>
        <button
          type="button"
          // id="showModalBtn"
          class="btn btn-outline-primary"
          // data-bs-toggle="modal"
          // data-bs-target="#classTeacher"
          onClick={() => navigate("/admin/addBlog")}
        >
          Add Blog
        </button>
      </div>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
      <Modal
        open={showEditBlog}
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
            <AddBlog
              edit={true}
              modalClose={() => setShowEditBlog(false)}
              data={selectedData}
              handleUpdateBlog={handleUpdate}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AllBlogs;
