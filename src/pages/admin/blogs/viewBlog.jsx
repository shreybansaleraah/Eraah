import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { getEachBlog } from "../../../utils/api-factory";
export default function ViewBlogs() {
  let navigate = useNavigate();
  const location = useLocation();
  const [blog, setBlog] = useState({});
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    getEachBlog(
      location.state,
      (callback) => {
        setBlog(callback.data);
      },
      (onError) => {
        // setMessage(onError.response.data.message ?? "something went wrong");
        // setShowPopup(true);
        navigate(-1);
      }
    );
  }, []);

  //   console.log("w", location);
  return (
    <>
      <div className="BlogPageView">
        <div className="banner">
          <img
            src={blog.photoUrl || ""}
            width={"100%"}
            style={{ height: "60vh" }}
            alt="banner-image"
          />
        </div>
        <div className="container my-4">
          <div className="heading-content">
            <h2
              style={{
                textAlign: "center",
                textDecoration: "underLine",
                color: "#6100ff",
              }}
            >
              {blog.title ?? ""}
            </h2>
          </div>

          <div dangerouslySetInnerHTML={{ __html: blog.content ?? "" }} />
        </div>
      </div>
    </>
  );
}
