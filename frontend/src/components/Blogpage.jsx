import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Blogpage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState();

  useEffect(() => {
    setBlog((prevBlog) => {
      if (prevBlog && prevBlog.id === id) {
        // If the id hasn't changed, no need to fetch again
        return prevBlog;
      }
    });
    fetch(`http://localhost:5000/api/v1/getpost/${id}`, {
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
        setBlog(data);
      });
  }, [id]);

  return (
    <>
      {blog ? (
        <div className="blogpagecont">
          <div className="blogtitle blogpagefield">
            <div className="blogpagetitle">{blog.title}</div>
            <div className="blogauth">By {blog.author.username}</div>
          </div>

          <img
            src={blog.imageUrl}
            alt=""
            className="blogpagefield singleblogimage"
          />

          <p className="blogcontent blogpagefield">{blog.description}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Blogpage;
