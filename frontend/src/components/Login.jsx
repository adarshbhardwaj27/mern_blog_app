import React, { useState } from "react";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (username && password) {
      fetch("http://localhost:5000/api/v1/login", {
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
          if (res.status === 200) {
            const successMessage = document.querySelector(".success-message");
            successMessage.classList.add("show");
            setTimeout(() => {
              window.location.href = "/";
            }, 1500);
            return res.json();
          }
          if (res.status === 401) {
            const successMessage = document.querySelector(".unauth-message");
            successMessage.classList.add("show");
            setTimeout(() => {
              successMessage.classList.remove("show");
            }, 1500);
          }
        })
        .then((response) => {
          localStorage.setItem("token", response.token);
        });
      setusername("");
      setpassword("");
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <>
      <div className="success-message">
        <p>Login Successful</p>
      </div>
      <div className="unauth-message">
        <p>Invalid Credentials. Please try again :(</p>
      </div>
      <div onSubmit={submitHandler} className="container">
        <div className="login">
          <h1 className="formtitle ">Login</h1>
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
            <button type="submit" className="createblogbtn btn" value="Login">
              Login
            </button>
            <button
              className="createblogbtn btn"
              onClick={(e) => {
                e.preventDefault();
                setusername("adarsh");
                setpassword("password@pass");
              }}
            >
              Login with Guest Credentials
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
