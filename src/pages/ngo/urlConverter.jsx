import React, { useRef, useState } from "react";
import Upload from "../../assets/upload.png";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { urlConverter } from "../../utils/api-factory";
import { useSelector } from "react-redux";
import Popup from "../../components/Popup";
import Loader from "../../assets/WhatsApp_Image_2024-02-10_at_11.58_1__1_-removebg-preview.png";
function UrlConverter() {
  const { currentUser } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [zipFile, setZipFile] = useState(null);
  const [loading, setLoading] = useState(false);
  let fileInputRef = useRef(null);

  const handleSubmition = () => {
    if (zipFile && zipFile.type.includes("zip")) {
      setLoading(true);
      urlConverter(
        currentUser._id,
        {
          file: zipFile,
        },
        (callback) => {
          const downloadUrl = callback.data.downloadUrl;
          // window.location.href = downloadUrl;
          window.open(process.env.REACT_APP_BASE_URL + downloadUrl, "_blank");
          setMessage("Downloadig Started successfully");
          setShowPopup(true);
          setLoading(false);
          setZipFile(null);
        },
        (onError) => {
          setLoading(false);
          setMessage(
            onError?.response?.data?.message ?? "something went wrong"
          );
          setShowPopup(true);
        }
      );
    } else {
      setMessage("select zip file");
      setShowPopup(true);
    }
  };

  return (
    <>
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
      <div className="d-flex justify-content-between align-items-center w-100 flex-wrap">
        <div className="col-lg-5 col-sm-12 col-12 col-md-5 m-auto">
          <div className="mt-4 runBulkCommModalBox">
            <div className="bulkCommHeader">Image to URL converter</div>

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
                  {zipFile ? (
                    <>
                      <InsertDriveFileIcon
                        style={{
                          color: "rgba(43, 120, 255, 0.7)",
                          marginRight: "0.6rem",
                        }}
                      />
                      <span style={{ color: "#2B78FF" }} className="">
                        {zipFile.name.substring(0, 15)}
                        {zipFile.name.length > 15 && "..."}
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
                        Click here to Upload ZIP File
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
                onClick={() => handleSubmition()}
              >
                Submit
              </button>
              <button
                title="clear"
                type="button"
                className="sendBtn mx-2"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                onClick={() => {
                  setZipFile(null);
                }}
              >
                clear
              </button>
            </div>
            <div
              className="communiCateViaDropdownContainer leadFountContainer d-flex justify-content-center p-3 w-100"
              style={{ lineHeight: "25px", textAlign: "center" }}
            >
              Please ensure that the all images are in a zip file.
            </div>
          </div>
        </div>

        <input
          type="file"
          accept=".zip"
          style={{ display: "none" }}
          // onChange={test}
          onChange={(e) => {
            setZipFile(e.target.files[0]);
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

export default UrlConverter;
