import React, { useEffect, useState } from "react";
import { getNgoDetails } from "../../redux/ngoRelated/ngoHandle";
import { useDispatch, useSelector } from "react-redux";
import Person from "../../assets/person.png";

import Organisation from "../../assets/Organisati.png";
import { useNavigate } from "react-router-dom";
import { getDonorInfo } from "../../utils/api-factory";
function DonorDetailHome({ donorId }) {
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  const [donorDetails, setDonorDetails] = useState({});
  //   const { selectedNgoId } = useSelector((state) => state.selectedUser);
  useEffect(() => {
    getDonorInfo(
      donorId,
      (callback) => {
        console.log("callback : ", callback);
        setDonorDetails(callback.data);
      },
      (onError) => {
        console.log(onError);
      }
    );
  }, [donorId]);
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
              <p>{donorDetails?.name || ""}</p>
            </div>

            <div className="">
              <span className="text-secondary">Pan</span>
              <p>{donorDetails?.pan || ""}</p>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
            <div className="">
              <span className="text-secondary">Email</span>
              <p>{donorDetails?.email}</p>
            </div>
            <div className="">
              <span className="text-secondary">Aadhar</span>
              <p>{donorDetails?.aadhar}</p>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
            <div className="">
              <span className="text-secondary">Phone Number</span>
              <p>{donorDetails?.phoneNumber || ""}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="left-panel my-4">
        <div className="first-heading d-inline-flex justify-content-start align-items-center">
          <i className="text-white bi bi-person-square"></i>
          <img src={Person} alt="" />
          <p className="px-3 m-0 text-white">
            <strong>Bank Details</strong>
          </p>
        </div>
        <div className="row p-4">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4 d-flex flex-column justify-content-around">
            <div className="">
              <span className="text-secondary">Name</span>
              <p>{donorDetails?.bankDetails?.name || ""}</p>
            </div>
            <div className="">
              <span className="text-secondary">Bank Name</span>
              <p>{donorDetails?.bankDetails?.bankName || ""}</p>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
            <div className="">
              <span className="text-secondary">Account Number</span>
              <p>{donorDetails?.bankDetails?.accountNumber || ""}</p>
            </div>
            <div className="">
              <span className="text-secondary">Branch Name</span>
              <p>{donorDetails?.bankDetails?.branchName || ""}</p>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
            <div className="">
              <span className="text-secondary">IFSC</span>
              <p>{donorDetails?.bankDetails?.ifsc || ""}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="left-panel my-4">
        <div className="first-heading d-inline-flex justify-content-start align-items-center">
          <i className="text-white bi bi-person-square"></i>
          <img src={Organisation} alt="" />
          <p className="px-3 m-0 text-white">
            <strong>Address</strong>
          </p>
        </div>
        <div className="row p-4">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-xxl-6 d-flex flex-column justify-content-around">
            <div className="">
              <span className="text-secondary">Address</span>
              <p>{donorDetails?.address?.place || ""}</p>
            </div>
            <div className="">
              <span className="text-secondary">State</span>
              <p>{donorDetails?.address?.state || ""}</p>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-4 d-flex flex-column justify-content-end align-items-start">
            <div className="">
              <span className="text-secondary">City</span>
              <p>{donorDetails?.address?.city || ""}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonorDetailHome;
