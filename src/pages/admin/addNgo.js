import React, { useEffect, useState } from "react";
import "./admin.css";
import { useDispatch } from "react-redux";
import { Add } from "@mui/icons-material";
import { addNgo, updateNgo } from "../../redux/ngoRelated/ngoHandle";
import Popup from "../../components/Popup";

import BackIcon from "../../assets/back.png";
import CancelIcon from "@mui/icons-material/Cancel";

function AddNgo({ edit = false, modalClose, handleUpdateNgo, data }) {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [page, setPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [payload, setPayload] = useState({
    name: "",
    founderName: "",
    pan: "",
    founderPan: "",
    email: "",
    password: "",
    address: "",
    trustee: "",
    schoolName: "",
    city: "",
    state: "",
    mobile: "",
    bankStatement: null,
    addressProof: null,
    nameOnBank: "",
    accountNo: "",
    ifsc: "",
    bankName: "",
    branchName: "",
    eraahCharges: "6",
  });

  const resetPayload = () => {
    setPayload({
      name: "",
      founderName: "",
      pan: "",
      founderPan: "",
      email: "",
      password: "",
      address: "",
      trustee: "",
      schoolName: "",
      city: "",
      state: "",
      mobile: "",
      bankStatement: null,
      addressProof: null,
      nameOnBank: "",
      accountNo: "",
      ifsc: "",
      bankName: "",
      branchName: "",
      eraahCharges: "6",
    });
  };
  useEffect(() => {
    console.log("payload.bankStatement");
    console.log(payload.bankStatement);
    // console.log(e.target.files[0]);
  }, [payload.bankStatement]);
  const handleChangePayload = (e) => {
    if (e.target.name === "addressProof" || e.target.name === "bankStatement") {
      //   console.log(e.target.files[0]);

      setPayload({ ...payload, [e.target.name]: e.target.files[0] });
    } else {
      setPayload({
        ...payload,
        [e.target.name]:
          e.target.name.includes("pan") || e.target.name.includes("founderPan")
            ? e.target.value.toUpperCase()
            : e.target.value,
      });
    }
  };
  const checkValid = () => {
    if (
      !payload.name ||
      !payload.founderName ||
      !payload.pan ||
      !payload.founderPan ||
      !payload.email ||
      !payload.password ||
      !payload.address ||
      !payload.trustee ||
      !payload.schoolName ||
      !payload.city ||
      !payload.state ||
      !payload.mobile ||
      !payload.eraahCharges ||
      (!payload.bankStatement && !edit) ||
      (!payload.addressProof && !edit)
    ) {
      // console.error("All fields are required");
      setErrorMessage("All fields are required");
      return false;
    }

    // Additional validation, e.g., email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (!emailRegex.test(payload.email)) {
      console.error("Invalid email format");

      setErrorMessage("Invalid email format");
      return false;
    } else if (!panRegex.test(payload.pan)) {
      console.error("Invalid pan format");
      setErrorMessage("Invalid pan format");
      return false;
    } else if (!panRegex.test(payload.founderPan)) {
      console.error("Invalid pan format");
      setErrorMessage("Invalid Founder pan format");
      return false;
    }
    return true;
  };
  const checkValid2 = () => {
    if (
      !payload.nameOnBank ||
      !payload.accountNo ||
      !payload.ifsc ||
      !payload.bankName ||
      !payload.branchName
    ) {
      // console.error("All fields are required");
      setErrorMessage("All fields are required");
      return false;
    }

    return true;
  };

  const handleAddNgo = () => {
    console.log("payload is ", payload);
    let tempPayload = {
      name: payload.name,
      founderName: payload.founderName,
      pan: payload.pan,
      founderPan: payload.founderPan,
      email: payload.email,
      password: payload.password,
      address: payload.address,
      trustee: payload.trustee,
      schoolName: payload.schoolName,
      city: payload.city,
      state: payload.state,
      mobile: payload.mobile,
      bankStatement: payload.bankStatement,
      addressProof: payload.addressProof,
      bankDetails: {
        name: payload.nameOnBank,
        accountNumber: payload.accountNo,
        ifsc: payload.ifsc,
        bankName: payload.bankName,
        branchName: payload.branchName,
      },
      eraahCharges: payload.eraahCharges,
    };

    dispatch(
      addNgo(
        tempPayload,
        (callback) => {
          console.log("add successfully");
          setErrorMessage("Added successfully");
          setShowPopup(true);
          resetPayload();
        },
        (onError) => {
          setErrorMessage("try again, something went wrong");
          console.log("get error", onError);
          setShowPopup(true);
        }
      )
    );
  };
  const handleUpdate = () => {
    console.log("payload is ", payload);
    // setPayload({ ...payload, ngoId: data._id });

    let tempPayload = {
      name: payload.name,
      founderName: payload.founderName,
      pan: payload.pan,
      founderPan: payload.founderPan,
      email: payload.email,
      password: payload.password,
      address: payload.address,
      trustee: payload.trustee,
      schoolName: payload.schoolName,
      city: payload.city,
      state: payload.state,
      mobile: payload.mobile,
      bankStatement: payload.bankStatement,
      addressProof: payload.addressProof,
      bankDetails: {
        name: payload.nameOnBank,
        accountNumber: payload.accountNo,
        ifsc: payload.ifsc,
        bankName: payload.bankName,
        branchName: payload.branchName,
      },
      eraahCharges: payload.eraahCharges,
    };

    handleUpdateNgo(tempPayload, resetPayload);
  };

  const handleNext = () => {
    if (page === 1) {
      if (checkValid()) {
        setPage(page + 1);
      } else {
        setShowPopup(true);
      }
    } else if (page === 2) {
      if (checkValid2()) {
        if (edit) {
          handleUpdate();
        } else {
          handleAddNgo();
        }
      } else {
        setShowPopup(true);
      }
    }
  };

  useEffect(() => {
    if (edit) {
      console.log(data);
      setPayload({ ...payload, ...data });
    }
  }, []);

  return (
    <div
      className="container col-lg-6 col-sm-11 col-11 col-md-11 m-auto mt-4 my-4 shadow rounded p-4 bg-white"
      style={{ position: "relative" }}
    >
      {page > 1 && (
        <div className="mb-4">
          <img
            style={{ cursor: "pointer", height: "2rem" }}
            onClick={() => setPage(page - 1)}
            // className="cursor-pointer"
            src={BackIcon}
            alt=""
            srcset=""
          />
        </div>
      )}
      {page === 1 ? (
        <>
          <div className="d-flex justify-content-center text-center mb-4">
            <h4>{!edit ? "Add" : "Edit"} NGO</h4>
          </div>

          <div className="d-flex justify-content-between flex-wrap">
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingRight: "2px" }}
            >
              <label for="exampleFormControlInput1" class="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter name"
                onChange={handleChangePayload}
                value={payload.name}
                name="name"
                required
              />
            </div>
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingLeft: "2px" }}
            >
              <label for="exampleFormControlInput1" class="form-label">
                Founder Name
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter founder name"
                onChange={handleChangePayload}
                value={payload.founderName}
                name="founderName"
                required
              />
            </div>
          </div>
          <div className="d-flex justify-content-between flex-wrap">
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingRight: "2px" }}
            >
              <label for="exampleFormControlInput1" class="form-label">
                Pan
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter pan"
                onChange={handleChangePayload}
                value={payload.pan}
                name="pan"
                required
              />
            </div>
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingLeft: "2px" }}
            >
              <label for="exampleFormControlInput1" class="form-label">
                Founder pan
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter founder pan"
                onChange={handleChangePayload}
                value={payload.founderPan}
                name="founderPan"
                required
              />
            </div>
          </div>

          <div className="d-flex justify-content-between flex-wrap">
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingRight: "2px" }}
            >
              <label for="exampleFormControlInput1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={handleChangePayload}
                value={payload.email}
                name="email"
                required
              />
            </div>
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingLeft: "2px" }}
            >
              <label for="exampleFormControlInput1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Create password"
                onChange={handleChangePayload}
                value={payload.password}
                name="password"
                required
              />
            </div>
          </div>

          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Address
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="2"
              placeholder="Enter address"
              name="address"
              onChange={handleChangePayload}
              value={payload.address}
              required
            ></textarea>
          </div>

          <div className="d-flex justify-content-between flex-wrap">
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingRight: "2px" }}
            >
              <label for="formFileSm" class="form-label">
                bank statement
              </label>
              <input
                class="form-control form-control-sm"
                id="formFileSm"
                type="file"
                accept="application/pdf"
                // value={payload.bankStatement}
                name="bankStatement"
                onChange={handleChangePayload}
                // required
              />
            </div>
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingLeft: "2px" }}
            >
              <label for="formFileSm" class="form-label">
                Address Proof
              </label>
              <input
                class="form-control form-control-sm"
                id="formFileSm"
                type="file"
                accept="application/pdf"
                // value={payload.addressProof}
                name="addressProof"
                onChange={handleChangePayload}
                required
              />
            </div>
          </div>

          <div className="d-flex justify-content-between flex-wrap">
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingRight: "2px" }}
            >
              <label for="exampleFormControlInput1" class="form-label">
                Trustee
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter trustee"
                name="trustee"
                onChange={handleChangePayload}
                value={payload.trustee}
                required
              />
            </div>
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingLeft: "2px" }}
            >
              <label for="exampleFormControlInput1" class="form-label">
                School
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter school name"
                onChange={handleChangePayload}
                value={payload.schoolName}
                name="schoolName"
                required
              />
            </div>
          </div>

          <div className="d-flex justify-content-between flex-wrap">
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingRight: "2px" }}
            >
              <label for="exampleFormControlInput1" class="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter city"
                name="city"
                onChange={handleChangePayload}
                value={payload.city}
                required
              />
            </div>
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingLeft: "2px" }}
            >
              <label for="exampleFormControlInput1" class="form-label">
                State
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter state"
                onChange={handleChangePayload}
                value={payload.state}
                name="state"
                required
              />
            </div>
          </div>
          <div className="d-flex justify-content-start flex-wrap">
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingRight: "2px" }}
            >
              <label for="exampleFormControlInput1" class="form-label">
                Phone number
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter mobile"
                name="mobile"
                onChange={handleChangePayload}
                value={payload.mobile}
                required
              />
            </div>
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingRight: "2px" }}
            >
              <label for="exampleFormControlInput1" class="form-label">
                Eraah charges {"(%)"}
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter mobile"
                name="eraahCharges"
                onChange={handleChangePayload}
                value={payload.eraahCharges.toString()}
                required
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-between flex-wrap">
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingRight: "2px" }}
            >
              <label for="exampleFormControlInput1" class="form-label">
                Name on bank
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter name in bank"
                onChange={handleChangePayload}
                value={payload.nameOnBank}
                name="nameOnBank"
                required
              />
            </div>
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingLeft: "2px" }}
            >
              <label for="formFileSm" class="form-label">
                Account number
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter account number"
                name="accountNo"
                value={payload.accountNo}
                onChange={handleChangePayload}
                required
              />
            </div>
          </div>

          <div className="d-flex justify-content-between flex-wrap">
            <div
              class="mb-3 col-12 col-lg-12 col-sm-12"
              style={{ paddingRight: "2px" }}
            >
              <label for="exampleFormControlInput1" class="form-label">
                IFSC
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter IFSC"
                onChange={handleChangePayload}
                value={payload.ifsc.toUpperCase()}
                name="ifsc"
                required
              />
            </div>
          </div>
          <div className="d-flex justify-content-between flex-wrap">
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingLeft: "2px" }}
            >
              <label for="formFileSm" class="form-label">
                BankName
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter Bank name"
                name="bankName"
                value={payload.bankName}
                onChange={handleChangePayload}
                required
              />
            </div>
            <div
              class="mb-3 col-12 col-lg-6 col-sm-6"
              style={{ paddingLeft: "2px" }}
            >
              <label for="formFileSm" class="form-label">
                Branch name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter Branch name"
                name="branchName"
                value={payload.branchName}
                onChange={handleChangePayload}
                required
              />
            </div>
          </div>
        </>
      )}

      <button
        type="button"
        class="btn btn-primary"
        onClick={() => {
          handleNext();
        }}
      >
        {/* {edit ? "Update" : "Add"} */}
        {page === 2 ? (edit ? "Update" : "Add") : "Next"}
      </button>
      {edit && (
        <div
          style={{ position: "absolute", top: 5, right: 5, cursor: "pointer" }}
          onClick={modalClose}
        >
          <CancelIcon />
        </div>
      )}
      <Popup
        message={errorMessage}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </div>
  );
}

export default AddNgo;
