import React, { useEffect, useState } from "react";
import Blog from "./Blog";

const Myblogs = () => {
  const [myblogs, setmyblogs] = useState(null);
  useEffect(() => {
    const author = localStorage.getItem("token");
    fetch(`http://localhost:5000/api/v1/getmyposts/${author}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setmyblogs(null);
        } else {
          setmyblogs(data);
        }
      });
  }, []);

  return (
    <div className="myblogs">
      <h1 className="myblogs-title">
        My Blogs
        <button
          className="myblogsbtn myblogsbtn_green"
          onClick={() => (window.location.href = "/updateblog")}
        >
          Update Blog
        </button>
        <button
          className="myblogsbtn myblogsbtn_del "
          onClick={() => (window.location.href = "/deleteblog")}
        >
          Delete Blog
        </button>
      </h1>
      {myblogs ? (
        <Blog blogdata={myblogs} />
      ) : (
        <em id="nothing">Nothing to show.</em>
      )}
    </div>
  );
};

export default Myblogs;
