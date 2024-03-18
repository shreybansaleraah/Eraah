import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTeachers } from "../../../redux/teacherRelated/teacherHandle";

import Eye from "../../../assets/eye.png";
import Pagination from "@mui/material/Pagination";
import { setTeacherId } from "../../../redux/selectedDataRelated/selectedDataHandler";
function ShowTeachers({ setSubTab }) {
  const { selectedNgoId } = useSelector((state) => state.selectedUser);
  const { teachersList, loading, error, response } = useSelector(
    (state) => state.teacher
  );
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getAllTeachers(selectedNgoId));
  }, []);

  const handleView = (id) => {
    setSubTab("showTeacher");
    dispatch(setTeacherId(id));
  };
  return loading ? (
    <div className="m-auto d-flex justify-content-center">loading ....</div>
  ) : (
    <>
      <div className="collection-table mt-4 table-other col-lg-11 col-sm-11 col-md-11 col-11 m-auto">
        <table className="table table-hover align-middle text-center">
          <thead>
            <tr className="align-middle">
              <th>View Details</th>
              <th>Name</th>
              <th className="">Class</th>
              <th className="">Subject</th>
            </tr>
          </thead>
          <tbody>
            {teachersList.slice(6 * (page - 1), 6 * page).map((item, index) => {
              console.log("item is : ", item);
              return (
                <tr key={index} style={{ borderBottom: "none" }}>
                  <td>
                    <img
                      onClick={() => {
                        handleView(item._id);
                      }}
                      className="hoverCusrsor"
                      src={Eye}
                      width={20}
                      height={20}
                      alt=""
                    />
                  </td>
                  <td scope="col">
                    <span id="comment">
                      <b>{item.name || ""}</b>
                    </span>
                  </td>
                  <td scope="col">
                    <span id="comment">
                      <b>{item.teachSclass.sclassName || ""}</b>
                    </span>
                  </td>
                  <td scope="col">
                    <span id="comment">
                      <b>{item.teachSubject.subName || ""}</b>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="d-inline-flex justify-content-end mb-5 p-3 w-100">
        <div className="">
          <Pagination
            style={{ alignSelf: "center" }}
            count={
              teachersList.length % 6 === 0
                ? parseInt(teachersList.length / 6)
                : parseInt(teachersList.length / 6) + 1
            }
            color="primary"
            shape="circular"
            onChange={(event, value) => {
              console.log(value);
              setPage(value);
            }}
            defaultValue={1}
            page={page}
          />
        </div>
      </div>
    </>
  );
}

export default ShowTeachers;
