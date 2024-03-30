import React from "react";
import menuDots from "../assets/threeDots.svg";
import defaultUser from "../assets/defaultUser.svg";
function LatestDonations() {
  var item = [1, 2, 3, 4];
  return (
    <div className="w-100 shadow rounded p-4">
      <div className="justify-content-between d-flex align-items-center mb-2">
        <div className="align-items-center">
          <p
            style={{
              fontWeight: "900",
              fontSize: "19px",
              color: "rgba(0, 0, 0, 1)",
              margin: 0,
            }}
          >
            Latest donations
          </p>
        </div>
        <img src={menuDots} color="rgba(161, 160, 189, 1)" />
      </div>

      {item.map((value) => {
        return (
          <div className="d-flex justify-content-between align-items-center my-3">
            <div style={{ width: "10%" }} className="align-items-center">
              <img
                src={defaultUser}
                style={{ width: "100%", borderRadius: "50%" }}
              />
            </div>
            <div style={{ width: "55%" }} className="align-items-center">
              <p style={{ margin: 0 }}>Jyoti</p>
              <p style={{ color: "rgba(162, 158, 188, 1)", margin: 0 }}>
                Personal Payment
              </p>
            </div>
            <div style={{ width: "30%" }} className="align-items-center">
              <p
                style={{
                  fontWeight: "800",
                  fontSize: "17px",
                  color: "rgba(110, 214, 158, 1)",
                  textAlign: "end",
                  margin: 0,
                }}
              >
                +$300.58
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LatestDonations;
