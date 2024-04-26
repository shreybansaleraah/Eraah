import React from "react";

function Teachers() {
  return (
    <table class="table table-bordered" style={{ minWidth: "100%" }}>
      <thead>
        <tr className="table-primary">
          <th scope="col">Name</th>
          <th scope="col">Class</th>
          <th scope="col">Email</th>
          <th scope="col">Password</th>
          <th scope="col">Aadhar</th>
          <th scope="col">Pan</th>
          <th scope="col">Subject</th>
          {/* <th scope="col">Class Teacher</th> */}
          <th scope="col">Class Teacher</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Renu</td>
          <td>9</td>
          <td>renu@gmail.com</td>
          <td>1234</td>
          <td>123412341234</td>
          <td>ASDFG1234A</td>
          <td>ENGLISH</td>
          <td>yes</td>
        </tr>
        <tr>
          <td>Meenu</td>
          <td>10</td>
          <td>meenu@gmail.com</td>
          <td>1234</td>
          <td>123412341234</td>
          <td>ASDFG1234A</td>
          <td>HINDI</td>
          <td>no</td>
        </tr>
        <tr>
          <td>Sunita</td>
          <td>11</td>
          <td>suneeta@gmail.com</td>
          <td>1234</td>
          <td>123412341234</td>
          <td>ASDFG1234A</td>
          <td>MATHS</td>
          <td>yes</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Teachers;
