import React from "react";
import donorIcon from "../assets/donorIcon.svg";
import beneficiaryIcon from "../assets/beneficiarIcon.svg";
import ngoIcon from "../assets/ngoIcon.svg";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
function Earning() {
  return (
    <>
      <div className="col-lg-3 col-sm-12 col-md-12 col-12 d-flex justify-content-center align-items-center my-4">
        <div style={{ width: "40%", marginRight: "1rem" }}>
          <img src={donorIcon} style={{ width: "108px", height: "80px" }} />
        </div>
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            marginLeft: "1rem",
            // backgroundColor: "red",
          }}
        >
          <p
            style={{
              fontWeight: "400",
              fontSize: "14px",
              color: "rgba(172, 172, 172, 1)",
              margin: 0,
            }}
          >
            Total Donars
          </p>
          <p
            style={{
              fontWeight: "700",
              fontSize: "32px",
              color: "rgba(51, 51, 51, 1)",
              margin: 0,
            }}
          >
            5,423
          </p>
          <p
            style={{
              fontWeight: "400",
              fontSize: "12px",
              color: "#000000",
              margin: 0,
            }}
          >
            <span
              style={{
                fontWeight: "700",
                fontSize: "12px",
                color: "rgba(0, 172, 79, 1)",
              }}
            >
              <span style={{ color: "rgba(0, 172, 79, 1)", fontWeight: "700" }}>
                <strong>
                  <ArrowUpwardIcon
                    color="rgba(0, 172, 79, 1)"
                    fontSize="14px"
                    // style={{ fontWeight: "700" }}
                  />
                </strong>
              </span>
              16%
            </span>{" "}
            this month
          </p>
        </div>
      </div>
      {/* <Divider orientation="vertical" color="#000000" /> */}
      <div className="col-lg-3 col-sm-12 col-md-12 col-12 d-flex justify-content-center align-items-center my-4">
        <div style={{ width: "40%", marginRight: "1rem" }}>
          <img
            src={beneficiaryIcon}
            style={{ width: "108px", height: "80px" }}
          />
        </div>
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            marginLeft: "1rem",
            // backgroundColor: "red",
          }}
        >
          <p
            style={{
              fontWeight: "400",
              fontSize: "14px",
              color: "rgba(172, 172, 172, 1)",
              margin: 0,
            }}
          >
            Toral Beneficiaries
          </p>
          <p
            style={{
              fontWeight: "700",
              fontSize: "32px",
              color: "rgba(51, 51, 51, 1)",
              margin: 0,
            }}
          >
            1,893
          </p>
          <p
            style={{
              fontWeight: "400",
              fontSize: "12px",
              color: "#000000",
              margin: 0,
            }}
          >
            <span
              style={{
                fontWeight: "700",
                fontSize: "12px",
                color: "rgba(208, 0, 75, 1)",
              }}
            >
              <span style={{ color: "rgba(208, 0, 75, 1)", fontWeight: "700" }}>
                <strong>
                  <ArrowDownwardIcon
                    color="rgba(208, 0, 75, 1)"
                    fontSize="14px"
                    // style={{ fontWeight: "700" }}
                  />
                </strong>
              </span>
              1%
            </span>{" "}
            this month
          </p>
        </div>
      </div>
      {/* <Divider orientation="vertical" color="#000000" /> */}
      <div className="col-lg-3 col-sm-12 col-md-12 col-12 d-flex justify-content-center align-items-center my-4">
        <div style={{ width: "40%", marginRight: "1rem" }}>
          <img src={ngoIcon} style={{ width: "108px", height: "80px" }} />
        </div>
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            marginLeft: "1rem",
            // backgroundColor: "red",
          }}
        >
          <p
            style={{
              fontWeight: "400",
              fontSize: "14px",
              color: "rgba(172, 172, 172, 1)",
              margin: 0,
            }}
          >
            Active NGOs
          </p>
          <p
            style={{
              fontWeight: "700",
              fontSize: "32px",
              color: "rgba(51, 51, 51, 1)",
              margin: 0,
            }}
          >
            189
          </p>
        </div>
      </div>
    </>
  );
}

export default Earning;
