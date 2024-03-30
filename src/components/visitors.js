import React from "react";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import styled from "styled-components";
function Visitors() {
  return (
    <>
      <div className="w-100 my-3">
        <p
          style={{
            fontSize: "20px",
            fontWeight: "500",
            color: "rgba(86, 40, 210, 1)",
            margin: 0,
          }}
        >
          Online Visitors
        </p>
        <p
          style={{
            fontSize: "54px",
            fontWeight: "500",
            color: "rgba(255, 195, 13, 1)",
            margin: 0,
          }}
        >
          20K
        </p>

        <BorderLinearProgress variant="determinate" value={50} />
      </div>
      <div className="w-100 my-3">
        <p
          style={{
            fontSize: "20px",
            fontWeight: "500",
            color: "rgba(86, 40, 210, 1)",
            margin: 0,
          }}
        >
          Offline Visitors
        </p>
        <p
          style={{
            fontSize: "54px",
            fontWeight: "500",
            color: "rgba(255, 195, 13, 1)",
            margin: 0,
          }}
        >
          7K
        </p>

        <BorderLinearProgress variant="determinate" value={50} />
      </div>
    </>
  );
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: "60%",
  // height: 100,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#000000",
    height: "12px",
  },
  [`& .${linearProgressClasses.bar}`]: {
    height: "12px",
    borderRadius: 5,
    backgroundImage:
      "linear-gradient(to right, rgba(163, 107, 253, 1), rgba(107, 138, 235, 1))",
  },
}));

export default Visitors;
