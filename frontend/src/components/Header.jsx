import React, { useContext } from "react";
import bg from "./bg.png";
import { Link } from "react-router-dom";
import { logincontext } from "../App";

const Header = () => {
  const [loggedin, setLoggedin] = useContext(logincontext);
  const togglelogin = () => {
    setLoggedin(false);
    localStorage.removeItem("token");
    console.log("logout");
    console.log(loggedin);
    window.location = "/login";
  };
  return (
    <>
      <div className="navbar">
        <div className="subnav">
          <img
            className="logo"
            src={bg}
            alt=""
            onClick={() => (window.location = "/")}
          />
          <div className="links">
            {loggedin ? (
              <>
                <Link to="/newblog" className="link">
                  Create New Blog
                </Link>
                <Link to="/myblogs" className="link">
                  My Blogs
                </Link>
                <button
                  onClick={() => togglelogin()}
                  className="link logoutbtn"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="link">
                  Login
                </Link>
                <Link to="/register" className="link">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
