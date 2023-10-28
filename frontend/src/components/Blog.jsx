import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logincontext } from "../App";

const Blog = ({ blogdata }) => {
  const [loggedin] = useContext(logincontext);
  const navigate = useNavigate();
  useEffect(() => {
    const box = document.getElementsByClassName("content");
    for (let i = 0; i < box.length; i++) {
      if (box[i].innerHTML.length > 150) {
        box[i].innerHTML = box[i].innerHTML.substring(0, 120) + ".........";
      }
    }
    const box2 = document.getElementsByClassName("title");
    for (let i = 0; i < box2.length; i++) {
      if (box2[i].innerHTML.length > 30) {
        box2[i].innerHTML = box2[i].innerHTML.substring(0, 25) + ".........";
      }
    }
  }, []);

  return (
    <>
      {loggedin
        ? blogdata.map((blog, index) => {
            return (
              <a href={`/blogpage/${blog._id}`} key={index}>
                <div className="blog ">
                  <img src={blog.imageUrl} alt="" className="blogimage" />
                  <div className="text">
                    <div className="title textcomp">{blog.title}</div>
                    <div className="author textcomp">
                      By {blog.author.username}
                    </div>
                    <div className="content textcomp">{blog.description}</div>
                  </div>
                </div>
              </a>
            );
          })
        : navigate("/login")}
    </>
  );
};

export default Blog;
