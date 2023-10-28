import React, { useEffect, useState } from "react";

const Updateblog = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [image, setimage] = useState();
  const [selectedOption, setSelectedOption] = useState("None");
  const [myblogs, setmyblogs] = useState(null);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    if (selectedValue !== "None") {
      const filterres = myblogs.filter((e) => {
        return e._id === selectedValue;
      });
      settitle(filterres[0].title);
      setdesc(filterres[0].description);
    } else {
      settitle("");
      setdesc("");
    }
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

  const waiter = (imagelink) => {
    // const author = localStorage.getItem("token");
    const requestBody = {
      title: title,
      description: desc,
      author: localStorage.getItem("token"),
    };

    if (imagelink) {
      requestBody.imageUrl = imagelink;
    }
    if (selectedOption !== "None") {
      fetch(`http://localhost:5000/api/v1/updatepost/${selectedOption}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }).then((res) => {
        const successMessage = document.querySelector(".success-message");
        successMessage.classList.add("show");
        setTimeout(() => {
          window.location.href = "/myblogs";
        }, 1500);
      });
    } else {
      alert("Please select blog to update");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!image && !title && !desc) {
      alert("Please fill atleast one field to update blog");
    } else {
      if (image) {
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
            window.location.href = "/myposts";
          });
      } else {
        waiter(null);
      }
    }
  };

  return (
    <>
      <div className="success-message">
        <p>Succesfully Updated blog post :)</p>
      </div>
      {myblogs && (
        <div className="newblog">
          <h1 className="newblogtitle">Update Blog</h1>
          <div className="selectblog">
            <div className="selectedoption">Selected option:</div>
            <select
              value={selectedOption}
              onChange={handleSelectChange}
              className="selectoption"
            >
              <option value="None">Select Blog</option>
              {myblogs.map((blog) => (
                <option value={blog._id} key={blog._id}>
                  {blog.title}
                </option>
              ))}
            </select>
          </div>
          <h5 className="mandetory">
            No field is mandetory to fill :) [You can change any number of
            field/s as required]
          </h5>
          <form method="post" className="newblogform" onSubmit={submitHandler}>
            <div className="posttitle blogformfield">
              <div htmlFor="title">New Title of Blog</div>
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
              <div htmlFor="description">New Description of Blog</div>
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
              <div htmlFor="image">Upload New Image for your Blog</div>
              <input
                type="file"
                name="file"
                id="file"
                placeholder="file"
                onChange={(e) => setimage(e.target.files[0])}
              />
            </div>
            <button value="CreateBlog" type="submit" className="createblogbtn">
              Update Blog
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Updateblog;
