import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Blog from "./Blog";
const Blogs = ({ verifyfunction }) => {
  const [datablog, setDatablog] = useState(null);
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/v1/getallposts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Request failed with status " + res.status);
        }
      })
      .then((data) => {
        setLoading(false);
        setDatablog(data);
      });
  }, []);

  return (
    <>
      <div className="blogs">
        <h1 className="myblogs-title">All Blogs</h1>
        {datablog ? (
          <Blog blogdata={datablog} />
        ) : (
          <div className="centered-container">
            <ClipLoader color={"#000000"} loading={loading} size={80} />
          </div>
        )}
      </div>
    </>
  );
};

export default Blogs;
