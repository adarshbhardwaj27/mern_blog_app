import React, { useEffect, useState } from "react";

const Deleteblog = () => {
  const [myblogs, setmyblogs] = useState(null);
  const [selectedOption, setSelectedOption] = useState("None");

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

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
        setmyblogs(data);
      });
  }, []);
  const click = () => {
    if (selectedOption !== "None") {
      fetch(`http://localhost:5000/api/v1/deletepost/${selectedOption}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res;
        })
        .then((data) => {
          const successMessage = document.querySelector(".success-message");
          successMessage.classList.add("show");
          setTimeout(() => {
            window.location.href = "/myblogs";
          }, 1500);
        });
    } else {
      alert("Select a blog to delete");
    }
  };
  return (
    <>
      {myblogs && (
        <>
          <div className="success-message">
            <p>Succesfully deleted blog post</p>
          </div>
          <div className="container">
            <div className="delete">
              <h1 className="deletetitle ">Delete Blog</h1>
              <div className=" delselect">
                <label>Select Blog</label>
                <select
                  value={selectedOption}
                  onChange={handleSelectChange}
                  className="selectblogdel"
                >
                  <option value="None">Select Blog</option>
                  {myblogs.map((blog) => (
                    <option value={blog._id} key={blog._id}>
                      {blog.title}
                    </option>
                  ))}
                </select>
              </div>
              <button className="createblogbtn btn" onClick={() => click()}>
                Delete Blog
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Deleteblog;
