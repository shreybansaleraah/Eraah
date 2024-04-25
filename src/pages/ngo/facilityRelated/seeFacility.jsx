import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Paper } from "@mui/material";
// import TableViewTemplate from "./TableViewTemplate";
import { BlueButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import { useNavigate } from "react-router-dom";
import {
  getAllFacilitiesOnDashboard,
  getFacilities,
  uploadDeployementProof,
} from "../../../utils/api-factory";
import Loader from "../../../assets/WhatsApp_Image_2024-02-10_at_11.58_1__1_-removebg-preview.png";
import Popup from "../../../components/Popup.js";
const SeeFacility = ({ ngoId }) => {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, currentRole } = useSelector((state) => state.user);
  //   const { noticesList, loading, error, response } = useSelector(
  //     (state) => state.notice
  //   );
  const [loading, setLoading] = useState([]);
  const [facilityList, setFacilityList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getFacilitiesInit();
  }, []);

  const getFacilitiesInit = () => {
    setLoading(true);
    if (currentRole === "NGO") {
      //   dispatch(getAllNotices(currentUser._id, "Notice"));
      getFacilities(
        currentUser._id,
        (callback) => {
          console.log(callback);
          setFacilityList(callback);
          setLoading(false);
        },
        (onError) => {
          setLoading(false);
        }
      );
    } else if (currentRole !== "admin") {
      //   dispatch(getAllNotices(currentUser.school._id, "Notice"));
      getFacilities(
        currentUser.school._id,
        (callback) => {
          setFacilityList(callback);
          setLoading(false);
        },
        (onError) => {
          setLoading(false);
        }
      );
    } else if (ngoId) {
      //   dispatch(getAllNotices(ngoId, "Notice"));
      getFacilities(
        ngoId,
        (callback) => {
          setFacilityList(callback);
          setLoading(false);
        },
        (onError) => {
          setLoading(false);
        }
      );
    } else {
      //   dispatch(getAllNoticesOnDashboard(currentUser._id));
      getAllFacilitiesOnDashboard(
        currentUser._id,
        (callback) => {
          setFacilityList(callback);
          setLoading(false);
        },
        (onError) => {
          setLoading(false);
        }
      );
    }
  };

  //   if (error) {
  //     console.log(error);
  //   }

  const facilityColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "quantity", label: "Quantity", minWidth: 100 },
    { id: "price", label: "Price", minWidth: 100 },
    { id: "school", label: "School", minWidth: 100 },
  ];

  const facilityRows = facilityList.map((facility) => {
    // const date = new Date(facility.date);
    // const dateString =
    //   date.toString() !== "Invalid Date"
    //     ? date.toISOString().substring(0, 10)
    //     : "Invalid Date";
    return {
      name: facility.name,
      quantity: (facility.quantity || "").substring(0, 10),
      price: facility.price,
      school: facility?.school?.schoolName ?? "",
      proofUrl: facility.proofOfDeployementUrl,
      id: facility._id,
    };
  });
  const ButtonHaver = ({ row }) => {
    console.log("row in button hover is : ", row);
    return (
      <>
        <BlueButton
          variant="contained mx-1"
          onClick={() => {
            setSelectedFacility(row);
            setShowModal(true);
          }}
        >
          View
        </BlueButton>
        {currentUser.role.toLowerCase() === "ngo" &&
          (row.proofUrl == null || row.proofUrl == "") && (
            <BlueButton
              variant="contained mx-1"
              onClick={() => {
                setShowUploadModal(true);
                setSelectedFacility(row);
              }}
            >
              Upload
            </BlueButton>
          )}
      </>
    );
  };
  const handleFileChange = (event) => {
    // Check if a file is selected
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Check if the selected file is an image
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
      } else {
        // If the selected file is not an image, show an error message
        alert("Please select an image file.");
      }
    }
  };
  const handleUploadProof = () => {
    if (selectedFile.type.startsWith("image/")) {
      setLoading(true);
      var payload = {
        id: selectedFacility.id,
        proof: selectedFile,
      };
      uploadDeployementProof(
        payload,
        (callback) => {
          setMessage(callback);
          setLoading(false);
          setShowUploadModal(false);
          getFacilitiesInit();
          setShowPopup(true);
        },
        (onError) => {
          setMessage(onError);
          setLoading(false);
          setShowUploadModal(false);

          setShowPopup(true);
        }
      );
    } else {
      alert("Please select an image file.");
    }
  };

  return (
    <div style={{ marginRight: "20px" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: "999999999999999999999999999999999999999999",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={Loader} alt="Rotating Image" className="rotate" />
        </div>
      )}
      {!(facilityList.length > 0) ? (
        <div style={{ fontSize: "20px" }}>No Facilities to Show Right Now</div>
      ) : (
        <>
          <h3 style={{ fontSize: "30px", marginBottom: "40px" }}>Facilities</h3>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            {Array.isArray(facilityList) && facilityList.length > 0 && (
              <TableTemplate
                buttonHaver={ButtonHaver}
                columns={facilityColumns}
                rows={facilityRows}
                buttonHaverLabel="Proof"
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

      {showUploadModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{
            display: "block",
            zIndex: "999999999999999999999999999",
          }}
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="loginModalLabel">
                  Upload Proof
                </h5>

                <button
                  type="button"
                  class="btn-close"
                  onClick={() => setShowUploadModal(false)}
                  aria-label="Close"
                ></button>
              </div>

              <div class="modal-body">
                <label for="floatingInput">Proof of deployement</label>

                {/* <div class="form-floating mb-3"> */}
                <input
                  type="file"
                  className="form-control my-2"
                  name="proofOfDeployement"
                  accept="image/*"
                  id="floatingInput"
                  placeholder="Upload here"
                  onChange={handleFileChange}
                />
                {/* </div> */}

                <div class="form-floating mb-3">
                  <button
                    class="btn btn-primary"
                    type="button"
                    onClick={handleUploadProof}
                  >
                    Upload
                  </button>
                </div>
              </div>
              <div class="modal-footer mb-3">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setShowUploadModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{
            display: "block",
            zIndex: "999999999999999999999999999",
          }}
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="loginModalLabel">
                  Proof Of Deployement
                </h5>

                <button
                  type="button"
                  class="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>

              <div class="modal-body">
                {selectedFacility.proofUrl != null &&
                selectedFacility.proofUrl != "" ? (
                  <>
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        maxWidth: "480px",
                        minWidth: "100px",
                        width: "auto",
                        // margin: "auto",
                        height: "40vh",
                      }}
                    >
                      <img
                        src={selectedFacility.proofUrl}
                        alt=""
                        srcset=""
                        style={{
                          // display: imageLoading ? "none" : "block",
                          width: "100%",
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "fill",
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <div class="form-floating mb-3">
                    <h4 style={{ color: "green" }}>No Proof Found Yet</h4>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </div>
  );
};

export default SeeFacility;
