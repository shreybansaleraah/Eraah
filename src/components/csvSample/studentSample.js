import React from "react";

function StudentSample() {
  return (
    <table class="table table-bordered" style={{ minWidth: "100%" }}>
      <thead>
        <tr className="table-primary">
          <th scope="col">Name</th>
          <th scope="col">Roll</th>
          <th scope="col">Class</th>
          <th scope="col">Photo Url</th>
          <th scope="col">Father Name</th>
          <th scope="col">Father Occupation</th>
          <th scope="col">Mother Name</th>
          <th scope="col">Mother Occupation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Rohan</td>
          <td>43</td>
          <td>9</td>
          <td>https://upload.com/rohanPic.jpeg</td>
          <td>Ramcharan</td>
          <td>Farmer</td>
          <td>Shyambati</td>
          <td>HouseWife</td>
        </tr>
        <tr>
          <td>Mohan</td>
          <td>44</td>
          <td>10</td>
          <td>https://upload.com/mohanPic.png</td>
          <td>Shyamcharan</td>
          <td>Farmer</td>
          <td>Ryambati</td>
          <td>HouseWife</td>
        </tr>
        <tr>
          <td>Sohan</td>
          <td>45</td>
          <td>11</td>
          <td>https://upload.com/sohanPic.jpg</td>
          <td>Ramcharan</td>
          <td>Farmer</td>
          <td>Maya</td>
          <td>HouseWife</td>
        </tr>
      </tbody>
    </table>
  );
}

export default StudentSample;
