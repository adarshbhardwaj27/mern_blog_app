import './App.css';
import Blogs from './components/Blogs';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import { createContext, useEffect } from 'react';
import { useState } from 'react';
import Newblog from './components/Newblog';
import Myblogs from './components/Myblogs';
import Blogpage from './components/Blogpage';
import Updateblog from './components/Updateblog';
import Deleteblog from './components/Deleteblog';
export const logincontext = createContext();


function App() {
  const [loggedin, setLoggedin] = useState(false);
  useEffect(() => {
    if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
      fetch("http://localhost:5000/api/v1/verifyuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          tokennum: localStorage.getItem("token"),
        },
      })
        .then((res) => {
          if (res.ok) {
            setLoggedin(true);
          } else {
            setLoggedin(false);
            window.location.href = "/login";
            alert("please login first");
          }
        })
    }

  }, []);

  return <>
    <logincontext.Provider value={[loggedin, setLoggedin]}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Blogs />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/newblog' element={<Newblog />} />
          <Route path='/updateblog' element={<Updateblog />} />
          <Route path='/deleteblog' element={<Deleteblog />} />
          <Route path='/myblogs' element={<Myblogs />} />
          <Route path='/blogpage/:id' element={<Blogpage />} />
        </Routes>
      </BrowserRouter>
    </logincontext.Provider>
  </>
}

export default App;
