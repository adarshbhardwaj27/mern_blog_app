import React, { useState } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const Newblog = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [image, setimage] = useState();
  let [loading, setLoading] = useState(false);

  const waiter = (imagelink) => {
    fetch("http://localhost:5000/api/v1/createpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: desc,
        imageUrl: imagelink,
        author: localStorage.getItem("token"),
      }),
    }).then((res) => {
      setLoading(false);
      const successMessage = document.querySelector(".success-message");
      successMessage.classList.add("show");
      setTimeout(() => {
        window.location.href = "/myblogs";
      }, 1000);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (image && title && desc) {
      setLoading(true);
      const formdata = new FormData();
      formdata.append("file", image);

      fetch("http://localhost:5000/api/v1/upload ", {
        method: "POST",
        body: formdata,
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          waiter(response);
        })
        .catch((err) => console.log("catch se hai", err));
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <>
      <div className="success-message">
        <p>Blog post created Succesfully</p>
      </div>
      {loading ? (
        <div className="centered-container">
          <PacmanLoader color={"#000000"} loading={loading} size={20} />
        </div>
      ) : (
        <div className="newblog">
          <h1 className="newblogtitle">New Blog</h1>
          <form method="post" className="newblogform" onSubmit={submitHandler}>
            <div className="posttitle blogformfield">
              <div htmlFor="title">Title of Blog</div>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </div>
            <div className="postdesc blogformfield">
              <div htmlFor="description">Description of Blog</div>
              <textarea
                type="text"
                name="description"
                id="description"
                placeholder="Description"
                value={desc}
                onChange={(e) => setdesc(e.target.value)}
              />
            </div>
            <div className="postimage blogformfield">
              <div htmlFor="image">Upload an Image for your Blog</div>
              <input
                type="file"
                name="file"
                id="file"
                placeholder="file"
                onChange={(e) => setimage(e.target.files[0])}
              />
            </div>
            <button value="CreateBlog" type="submit" className="createblogbtn">
              Create Blog
            </button>
          </form>
        </div>
      )}
    </>
  );
};
export default Newblog;
