import React, { useEffect, useState } from "react";
import { getNgoDetails } from "../../redux/ngoRelated/ngoHandle";
import { useDispatch, useSelector } from "react-redux";
import Person from "../../assets/person.png";

import Organisation from "../../assets/Organisati.png";
import { useNavigate } from "react-router-dom";
function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ngoDetails, setNgoDetails] = useState({});
  const { selectedNgoId } = useSelector((state) => state.selectedUser);
  useEffect(() => {
    dispatch(
      getNgoDetails(
        selectedNgoId,
        (callback) => {
          console.log("callback : ", callback);
          setNgoDetails(callback);
        },
        (onError) => {}
      )
    );
  }, [selectedNgoId]);
  return (
    <div className="col-lg-11 col-sm-11 col-11 col-md-11 m-auto">
      <div className="left-panel my-4">
        <div className="first-heading d-inline-flex justify-content-start align-items-center">
          <i className="text-white bi bi-person-square"></i>
          <img src={Person} alt="" />
          <p className="px-3 m-0 text-white">
            <strong>Basic Details</strong>
          </p>
        </div>
        <div className="row p-4">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4 d-flex flex-column justify-content-around">
            <div className="">
              <span className="text-secondary">Name</span>
              <p>{ngoDetails?.name || ""}</p>
            </div>

            <div className="">
              <span className="text-secondary">School Name</span>
              <p>{ngoDetails?.schoolName || ""}</p>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
            <div className="">
              <span className="text-secondary">Pan</span>
              <p>{ngoDetails?.pan}</p>
            </div>
            <div className="">
              <span className="text-secondary">City</span>
              <p>{ngoDetails?.city || ""}</p>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
            <div className="">
              <span className="text-secondary">Address</span>
              <p>{ngoDetails?.address || ""}</p>
            </div>
            <div className="">
              <span className="text-secondary">State</span>
              <p>{ngoDetails?.state || ""}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="left-panel my-4">
        <div className="first-heading d-inline-flex justify-content-start align-items-center">
          <i className="text-white bi bi-person-square"></i>
          <img src={Person} alt="" />
          <p className="px-3 m-0 text-white">
            <strong>Founder & Trustee</strong>
          </p>
        </div>
        <div className="row p-4">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4 d-flex flex-column justify-content-around">
            <div className="">
              <span className="text-secondary">Founder Name</span>
              <p>{ngoDetails?.founderName || ""}</p>
            </div>

            <div className="">
              <span className="text-secondary">Trustee</span>
              <p>{ngoDetails?.trustee || ""}</p>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
            <div className="">
              <span className="text-secondary">Pan</span>
              <p>{ngoDetails?.pan}</p>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
            <div className="">
              <span className="text-secondary">Email</span>
              <p>{ngoDetails?.email || ""}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="left-panel my-4">
        <div className="first-heading d-inline-flex justify-content-start align-items-center">
          <i className="text-white bi bi-person-square"></i>
          <img src={Organisation} alt="" />
          <p className="px-3 m-0 text-white">
            <strong>Documents</strong>
          </p>
        </div>
        <div className="row p-4">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4 d-flex flex-column justify-content-around">
            <div className="my-2">
              <p className="text-secondary m-0 p-0">Address Proof</p>
              <a
                href=""
                target="_blank"
                style={{ color: "lightblue", textDecoration: "underLine" }}
              >
                {ngoDetails?.addUrl || ""}
              </a>
            </div>

            <div className="my-2">
              <p className="text-secondary m-0 p-0">Bank Statement</p>
              <a
                href=""
                target="_blank"
                style={{ color: "lightblue", textDecoration: "underLine" }}
              >
                {ngoDetails?.bankUrl || ""}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
