import React, { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { userSlice } from "../Redux/userSlice";
import Navbar from "../../components/Navbar";
import "../style/user/home.css";
import axios from "axios";

// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

function Home() {
  // const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // toast.loading();
    try {
      const token = localStorage.getItem("user");
      const response = await axios.get("/api/user/getuserinfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // toast.dismiss();
      if (response.data.success) {
        setUserInfo(response.data.data);
        
      } else {
        
        // localStorage.removeItem("user");
        // navigate("/login");
        // toast.error("Something went wrong");
      }
    } catch (error) {
      // localStorage.removeItem("user");
      // navigate("/login");
      //  toast.error("Something went wrong");
      
    }
  };

  
console.log(userInfo);
  return (
    <>
      <Navbar />
      <div className="main">
        {userInfo ?
        (<h1>{userInfo?.name}</h1>)
        :<h1>heool</h1>
        }
      </div>
    </>
  );
}

export default Home;

// import React from 'react'
// import Navbar from "./Navbar";

// export default function Home() {
//   return (
//     <div>
//       <Navbar/>
      
//     </div>
//   )
// }

