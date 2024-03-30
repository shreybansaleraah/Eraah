import React from "react";

function SubjectCsv() {
  return (
    <table class="table table-bordered" style={{ minWidth: "100%" }}>
      <thead>
        <tr className="table-primary">
          <th scope="col">Subject</th>
          <th scope="col">Subject code</th>
          <th scope="col">Session</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>English</td>
          <td>EN-201</td>
          <td>12</td>
        </tr>
        <tr>
          <td>HINDI</td>
          <td>HI-201</td>
          <td>12</td>
        </tr>
        <tr>
          <td>MATHS</td>
          <td>MA-201</td>
          <td>12</td>
        </tr>
        <tr>
          <td>SCIENCE</td>
          <td>SC-201</td>
          <td>12</td>
        </tr>
      </tbody>
    </table>
  );
}

export default SubjectCsv;
