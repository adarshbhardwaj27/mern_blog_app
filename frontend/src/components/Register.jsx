import React, { useState } from "react";

const Register = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (username && password) {
      fetch("http://localhost:5000/api/v1/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => {
          if (res.ok) {
            const successMessage = document.querySelector(".success-message");
            successMessage.classList.add("show");
            return res.json();
          }
        })
        .then((res) => {
          localStorage.setItem("token", res.token);
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
        });
      setusername("");
      setpassword("");
    } else {
      alert("Please enter all the details");
    }
  };

  return (
    <>
      <div className="success-message">
        <p>Register Successful</p>
      </div>
      <div onSubmit={submitHandler} className="container">
        <div className="login">
          <h1 className="formtitle ">Register</h1>
          <form method="post" className="formpapa" id="myform">
            <div className="username formfield">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </div>
            <div className="password formfield">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn createblogbtn" value="Login">
              Register
            </button>
            <p id="para">
              You can also login by Guest Credentials on login page :)
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
