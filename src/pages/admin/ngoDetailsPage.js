import React, { useEffect, useState } from "react";
import "./admin.css";
import { NGOTabs } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Home from "./home";
import ShowClasses from "./classRelated/ShowClasses";
import { setNgoId } from "../../redux/selectedDataRelated/selectedDataHandler";
import ClassDetails from "./classRelated/ClassDetails";
import Back from "../../assets/back.png";
import StudentDetail from "./classRelated/studentDetail";
import ShowTeachers from "./teacherRelated/ShowTeachers";
import TeacherDetail from "./teacherRelated/teacherDetail";
function NgoDetailsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tab, setTab] = useState(NGOTabs.Home);
  const [subTab, setSubTab] = useState("");
  const handleChangeTab = (tabValue) => {
    setTab(tabValue);
    setSubTab("");
  };
  const handleChangeSubTab = (tabValue) => {
    setSubTab(tabValue);
  };
  const handleBackBtn = () => {
    if (subTab === "selectedClass" || subTab === "showTeacher") {
      setSubTab("");
    } else if (subTab === "selectedStudent") {
      setSubTab("selectedClass");
    }
  };
  const { selectedNgoId } = useSelector((state) => state.selectedUser);

  useEffect(() => {
    if (!selectedNgoId) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="tabsContainer bg-white col-lg-11 col-11 col-md-11 col-sm-11 m-auto">
        <div
          className="aggDetailsTab"
          style={
            tab === NGOTabs.Home ? { borderBottom: "3px solid #2B78FF" } : {}
          }
        >
          <a
            className="tabText"
            style={
              tab === NGOTabs.Home ? { color: "#2B78FF", fontWeight: 700 } : {}
            }
            onClick={() => handleChangeTab(NGOTabs.Home)}
          >
            Home
          </a>
        </div>
        <div
          className="aggDetailsTab"
          style={
            tab === NGOTabs.Classes ? { borderBottom: "3px solid #2B78FF" } : {}
          }
        >
          <a
            className="tabText"
            style={
              tab === NGOTabs.Classes
                ? { color: "#2B78FF", fontWeight: 700 }
                : {}
            }
            onClick={() => handleChangeTab(NGOTabs.Classes)}
          >
            Classes
          </a>
        </div>
        <div
          className="aggDetailsTab"
          style={
            tab === NGOTabs.Teachers
              ? { borderBottom: "3px solid #2B78FF" }
              : {}
          }
        >
          <a
            className="tabText"
            style={
              tab === NGOTabs.Teachers
                ? { color: "#2B78FF", fontWeight: 700 }
                : {}
            }
            onClick={() => handleChangeTab(NGOTabs.Teachers)}
          >
            Teachers
          </a>
        </div>
        {/* <div
          className="aggDetailsTab"
          style={
            tab === NGOTabs.Events ? { borderBottom: "3px solid #2B78FF" } : {}
          }
        >
          <a
            className="tabText"
            style={
              tab === NGOTabs.Events
                ? { color: "#2B78FF", fontWeight: 700 }
                : {}
            }
            onClick={() => handleChangeTab(NGOTabs.Events)}
          >
            Events
          </a>
        </div> */}
      </div>

      {tab === NGOTabs.Home && <Home />}
      {tab === NGOTabs.Classes && (
        <>
          {subTab.length > 0 ? (
            <div className="col-lg-11 col-sm-11 col-md-11 col-11 m-auto">
              <div className="my-2">
                <img
                  className="back_btn hoverCusrsor"
                  onClick={() => handleBackBtn()}
                  src={Back}
                  width={37}
                  height={37}
                />
              </div>
              {subTab === "selectedClass" ? (
                <ClassDetails setSubTab={setSubTab} />
              ) : (
                <StudentDetail />
              )}
            </div>
          ) : (
            <ShowClasses setSubTab={setSubTab} />
          )}
        </>
      )}
      {tab === NGOTabs.Teachers && (
        <>
          {subTab.length > 0 ? (
            <>
              <div className="col-lg-11 col-sm-11 col-md-11 col-11 m-auto">
                <div className="my-2">
                  <img
                    className="back_btn hoverCusrsor"
                    onClick={() => handleBackBtn()}
                    src={Back}
                    width={37}
                    height={37}
                  />
                </div>
              </div>
              <TeacherDetail />
            </>
          ) : (
            <ShowTeachers setSubTab={setSubTab} />
          )}
        </>
      )}
    </>
  );
}

export default NgoDetailsPage;
