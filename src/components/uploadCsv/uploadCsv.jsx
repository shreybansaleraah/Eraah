import React, { useState, useRef, useEffect } from "react";
import "./uploadCsv.css";
import DownloadCloudData from "../../assets/downloadCloudData.png";
import Upload from "../../assets/upload.png";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import EmployeeOnboardingImg from "../../assets/employeeOnboardingImg.png";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Back from "../../assets/back.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addDataByCsv,
  getAllSclasses,
} from "../../redux/sclassRelated/sclassHandle";
import Popup from "../Popup";
import StudentSample from "../csvSample/studentSample";
import Teachers from "../csvSample/teachers";
import ClassSample from "../csvSample/classSample";
import SubjectCsv from "../csvSample/subjectCsv";
function UploadCsv({ onBack, actionFor, payload = {} }) {
  const [csvFile, setCsvFile] = useState(null);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  let fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const NGOID = currentUser._id;

  const submitCsvFile = () => {
    if (csvFile) {
      payload = { ...payload, actionFor, csvFile };
      dispatch(
        addDataByCsv(
          NGOID,
          payload,
          (callback) => {
            setMessage(callback.message);
            setCsvFile(null);
            setShowPopup(true);
            dispatch(getAllSclasses(NGOID, "Sclass"));
          },
          (onError) => {
            setMessage(onError.response.data.message);
            setShowPopup(true);
          }
        )
      );
    } else {
      setMessage("Please select file");
      setShowPopup(true);
    }
  };

  useEffect(() => {
    console.log("csv file is : ", csvFile);
  }, [csvFile]);

  return (
    <>
      <div className="my-2">
        {onBack && (
          <img
            className="back_btn hoverCusrsor"
            onClick={() => onBack()}
            src={Back}
            width={37}
            height={37}
          />
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center w-100 flex-wrap">
        <div className="col-lg-5 col-sm-12 col-12 col-md-5">
          <div className="mt-4 runBulkCommModalBox">
            <div className="bulkCommHeader">Upload CSV File</div>

            <div
              style={{
                width: "100%",
                height: "8rem",
                backgroundColor: "rgba(219, 233, 255, 0.70)",
                borderRadius: "6px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "1.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "90%",

                  // height: "4rem",
                  backgroundColor: "rgba(219, 233, 255, 0.70)",
                  border: "1px dashed black",
                  cursor: "pointer",
                }}
                className="d-flex justify-content-center align-items-center m-auto rounded p-2"
                onClick={(e) => fileInputRef.click()}
              >
                <div className="d-inline-flex align-items-center">
                  {csvFile ? (
                    <>
                      <InsertDriveFileIcon
                        style={{
                          color: "rgba(43, 120, 255, 0.7)",
                          marginRight: "0.6rem",
                        }}
                      />
                      <span style={{ color: "#2B78FF" }} className="">
                        {csvFile.name.substring(0, 15)}
                        {csvFile.name.length > 15 && "..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <img
                        src={Upload}
                        width={20}
                        height={20}
                        className="mx-2"
                      />
                      <span style={{ color: "rgba(0, 0, 0, 0.40)" }}>
                        Click here to Upload CSV File
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="d-flex flex-wrap justify-content-start align-items-center">
              <button
                title="Submit"
                type="button"
                className="sendBtn"
                onClick={() => submitCsvFile()}
              >
                Submit
              </button>
              <button
                title="clear"
                type="button"
                className="sendBtn mx-2"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                onClick={() => {
                  setCsvFile(null);
                }}
              >
                clear
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-sm-12 col-md-6 col-12 mt-2 d-flex flex-column justify-content-start align-items-center p-4 rounded shadow">
          <h3 className="aggregatorHeader" style={{ alignSelf: "start" }}>
            CSV Sample File{" "}
          </h3>
          <div className="w-100 mt-4 runBulkCommModalBox px-4 py-4">
            {actionFor === "student" ? (
              <StudentSample />
            ) : actionFor === "teacher" ? (
              <Teachers />
            ) : actionFor === "class" ? (
              <ClassSample />
            ) : (
              <SubjectCsv />
            )}
          </div>

          <div
            className="communiCateViaDropdownContainer leadFountContainer p-3 w-100"
            style={{ lineHeight: "25px" }}
          >
            Please ensure that the CSV file with data of Employee should be in
            this format.
          </div>
          {/* <div className="d-flex justify-content-center align-items-center w-100">
            <button
              title="Submit"
              type="button"
              className="btnWidth"
              // style={{ width: "45%" }}
            >
              
              <CloudDownloadIcon />
              <span style={{ marginLeft: "1rem" }}>
                Download CSV Sample File
              </span>
            </button>
          </div> */}
        </div>
        <input
          type="file"
          accept=".csv"
          style={{ display: "none" }}
          // onChange={test}
          onChange={(e) => {
            setCsvFile(e.target.files[0]);
          }}
          ref={(fileInput) => (fileInputRef = fileInput)}
        />
      </div>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
}

export default UploadCsv;
