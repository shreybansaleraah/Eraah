import React, { useEffect } from "react";
import Person from "../assets/person.png";
import { useLocation, useNavigate } from "react-router-dom";

function NoticeDetail() {
  const location = useLocation().state;
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  };

  useEffect(() => {
    if (!location?.data) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <div className="col-11 col-sm-11 col-md-11 col-lg-11 d-flex flex-column justify-content-start m-auto">
        <div className="left-panel my-4">
          <div className="second-heading d-inline-flex justify-content-start align-items-center">
            <i className="text-white bi bi-person-square"></i>
            <img src={Person} alt="" />
            <p className="px-3 m-0 text-white">
              <strong>Notice Details</strong>
            </p>
          </div>
          <div className="row p-4">
            <div className="col-11 col-sm-11 col-md-11 col-lg-11 d-flex flex-column justify-content-start">
              <div className="">
                <span className="text-secondary">Title</span>
                <p>{location?.data?.title || ""}</p>
              </div>
              <div className="">
                <span className="text-secondary">Time</span>
                <p>{location?.data?.time || ""}</p>
              </div>
              <div className="">
                <span className="text-secondary">Date</span>
                <p>{formatDate(location?.data?.date) || ""}</p>
              </div>
              <div className="">
                <span className="text-secondary">Entry Fee</span>
                <p>{"₹ " + (location?.data?.entryFee || "")}</p>
              </div>
              <div className="">
                <span className="text-secondary">Description</span>
                <p>{location?.data?.description || ""}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoticeDetail;
