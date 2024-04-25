import { Container, Divider, Grid, Paper } from "@mui/material";
import SeeNotice from "../../components/SeeNotice.js";
import Students from "../../assets/img1.png";
import Classes from "../../assets/img2.png";
import Teachers from "../../assets/img3.png";
import Fees from "../../assets/img4.png";
import styled from "styled-components";
import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAdminDashboard,
  getAllNgo,
} from "../../redux/ngoRelated/ngoHandle.js";
import { current } from "@reduxjs/toolkit";
import donorIcon from "../../assets/donorIcon.svg";
import beneficiaryIcon from "../../assets/beneficiarIcon.svg";
import ngoIcon from "../../assets/ngoIcon.svg";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import LatestDonations from "../../components/latestDonations.jsx";
import "./admin.css";
import ApexCharts from "react-apexcharts";

import Earning from "../../components/earning.js";
import Visitors from "../../components/visitors.js";
import DonationGraph from "../../components/donationGraph.js";
import bottomEclipse from "../../assets/eclipseBottom.svg";
import SeeFacility from "../ngo/facilityRelated/seeFacility.jsx";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  // const { ngoList } = useSelector((state) => state.ngo);
  // const { sclassesList } = useSelector((state) => state.sclass);
  // const { teachersList } = useSelector((state) => state.teacher);
  const [adminDashboardData, setAdminDashboardData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [chartDataa, setChartDataa] = useState({
    series: [75],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },
          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px",
            },
            value: {
              formatter: function (val) {
                return parseInt(val);
              },
              color: "#111",
              fontSize: "36px",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#ABE5A1"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Percent"],
    },
  });
  //   const NGOID = currentUser._id;
  useEffect(() => {
    console.log("hello home page");
    console.log(currentUser);
    dispatch(
      getAdminDashboard(
        currentUser._id,
        (callback) => {
          setAdminDashboardData(callback);
        },
        (onError) => {}
      )
    );
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <div
          className=" d-flex flex-wrap justify-content-between align-items-center dispurse p-4 rounded"
          style={{ position: "relative" }}
        >
          <div className="col-lg-7 col-sm-12 col-md-12 col-12">
            <p
              style={{
                fontWeight: "900",
                fontSize: "43px",
                color: "rgba(86, 40, 210, 1)",
              }}
            >
              Total dispursed today
            </p>
            <p
              style={{
                fontWeight: "700",
                fontSize: "40px",
                color: "rgba(255, 195, 13, 1)",
                margin: 0,
              }}
            >
              $28,55
            </p>
            <button type="button" className="cust-Btn">
              See All
            </button>
          </div>

          <div className="col-lg-4 col-sm-12 col-md-12 col-12 d-flex justify-content-end align-items-end">
            <div
              style={{
                width: "250px",
                height: "210px",
                backgroundColor: "rgba(86, 40, 210, 1)",
                borderRadius: "50%",
              }}
              className="d-flex flex-column justify-content-center align-items-center"
            >
              <p
                style={{
                  fontWeight: "800",
                  fontSize: "40px",
                  color: "#FFFFFF",
                }}
              >
                $ 200.58
              </p>
              <p
                style={{
                  fontWeight: "900",
                  fontSize: "25px",
                  color: "rgba(255, 255, 255, 1)",
                }}
              >
                Total dispursed
              </p>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: 0, left: "15vw" }}>
            <img
              src={bottomEclipse}
              style={{ width: "80%" }}
              alt=""
              srcset=""
            />
          </div>
        </div>

        {/* ============= earning section ====================== */}
        <div className="px-4 d-flex flex-wrap justify-content-between align-items-center my-4">
          <Earning />
        </div>

        {/* ========== dashboard all data of ngos ================= */}

        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Students} alt="Students" />
              <Title>Total NGO</Title>
              <Data
                start={0}
                end={adminDashboardData.ngosCount || 0}
                duration={2.5}
              />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Classes} alt="Classes" />
              <Title>Total Classes</Title>
              <Data
                start={0}
                end={adminDashboardData.classCount || 0}
                duration={5}
              />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Teachers} alt="Teachers" />
              <Title>Total Teachers</Title>
              <Data
                start={0}
                end={adminDashboardData.teacherCount || 0}
                duration={2.5}
              />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Teachers} alt="Teachers" />
              <Title>Total Students</Title>
              <Data
                start={0}
                end={adminDashboardData.studentCount || 0}
                duration={2.5}
              />
            </StyledPaper>
          </Grid>
          {/* <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Fees} alt="Fees" />
              <Title>Fees Collection</Title>
              <Data start={0} end={23000} duration={2.5} prefix="$" />{" "}
            </StyledPaper>
          </Grid> */}
        </Grid>

        {/* ========= donation Graph section =================  */}

        <div className="d-flex justify-content-between flex-wrap my-4">
          <div
            className="col-lg-6 col-sm-12 col-md-12 col-12 p-4"
            style={{ backgroundColor: "rgba(227, 182, 69, 0.08)" }}
          >
            <DonationGraph />
          </div>

          <div className="col-lg-5 col-sm-12 col-md-12 col-12 ">
            <ApexCharts
              options={chartDataa.options}
              series={chartDataa.series}
              type="radialBar"
              height={350}
            />
          </div>
        </div>

        {/* ========= latest donation & visitors section ============ */}

        <div className="d-flex flex-wrap justify-content-between align-items-center w-100">
          <div className="col-lg-5 col-sm-12 col-12 col-md-12 my-4">
            <LatestDonations />
          </div>
          <div className="col-lg-5 col-sm-12 col-12 col-md-12 my-4">
            <Visitors />
          </div>
        </div>

        {/* ========== notices ========== */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{ p: 2, display: "flex", flexDirection: "column" }}
            className="my-3"
          >
            <SeeNotice />
          </Paper>
          <Paper
            sx={{ p: 2, display: "flex", flexDirection: "column" }}
            className="my-3"
          >
            <SeeFacility />
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + 0.6vw);
  color: green;
`;

export default AdminHomePage;
