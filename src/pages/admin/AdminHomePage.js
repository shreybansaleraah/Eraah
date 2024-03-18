import { Container, Grid, Paper } from "@mui/material";
import SeeNotice from "../../components/SeeNotice";
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

const AdminHomePage = () => {
  const dispatch = useDispatch();
  // const { ngoList } = useSelector((state) => state.ngo);
  // const { sclassesList } = useSelector((state) => state.sclass);
  // const { teachersList } = useSelector((state) => state.teacher);
  const [adminDashboardData, setAdminDashboardData] = useState({});
  const { currentUser } = useSelector((state) => state.user);

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
          <Grid item xs={12} md={12} lg={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <SeeNotice />
            </Paper>
          </Grid>
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
