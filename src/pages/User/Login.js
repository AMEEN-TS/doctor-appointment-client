import React, { useState } from "react";
import "../style/user/login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Redux/alertsSlice";

function Login() {
 
  const dispatch = useDispatch();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userObj = {
      password,
      email,
    };
    console.log("Received", userObj);

    try {
      // toast.loading("Loading...");
      dispatch(showLoading());
     
      const response = await axios.post("/api/user/login", userObj);
      // toast.dismiss();
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("user", response.data.data);
        const userData = response.data.userData
        
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("something went wrong");
    }
  };


  const sendResetPasswordLink = async (e) => {
    e.preventDefault();
    const emailobj = {
      email,
    }
    try {
      toast.loading();
      const responses = await axios.post("/api/user/send-password-reset-link",emailobj
        
      );
      toast.dismiss();
      if (responses.data.success) {
        toast.success(responses.data.message);
        setShowForgotPassword(false);
     
      } else {
        toast.error(responses.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {!showForgotPassword && (
         <div className=" container-fluid body1">
         <div className="containers">
           <h2>Login Account</h2>
           <form className="form1" onSubmit={(e) => handleSubmit(e)}>
             <div className="formdiv1">
               <label htmlFor="email">Email</label>
               <input
                 type="email"
                 name="email"
                 placeholder="Email"
                 onChange={(e) => setEmail(e.target.value)}
                 value={email}
               />
             </div>
             <div className="formdiv1">
               <label htmlFor="password">Password</label>
               <input
                 type="password"
                 name="password"
                 placeholder="Password"
                 onChange={(e) => setPassword(e.target.value)}
                 value={password}
               />
             </div>
             <Link style={{ textDecoration: "none",marginLeft: "auto" }} to=""   onClick={() => setShowForgotPassword(true)}>
               Forgot Password?
             </Link>
             <button className="register_button" type="submit">
               Submit
             </button>
             <span>
               Don't have an account?{" "}
               <Link style={{ textDecoration: "none" }} to="/register">
                 Register
               </Link>
             </span>
 
             {/* Don't have an account?{" "}
               <Link style={{ textDecoration: "none" }} to="/register">
               Don't have an account?
               </Link> */}
           </form>
         </div>
       </div>
      )}
     {showForgotPassword &&(
       <div className=" container-fluid body1">
       <div className="containers">
         <h2> Enter your email</h2>
         <form className="form1" onSubmit={(e) => sendResetPasswordLink(e)}>
           <div className="formdiv1">
             <label htmlFor="email">Email</label>
             <input
               type="email"
               name="email"
               placeholder="Email"
               onChange={(e) => setEmail(e.target.value)}
               value={email}
             />
           </div>
        
           <button  className="register_button" type="submit"  onClick={sendResetPasswordLink}>
             Submit
           </button>
           

         </form>
       </div>
     </div>
     )}
    </>
  );
}

export default Login;
