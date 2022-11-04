import React from "react";
// import "../style/user/register.css";
import "../style/user/resetpassword.css";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

function Resetpassword() {
  const Navigate = useNavigate();
  const params = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password === data.confirmpassword) {
      console.log("data", params.token);
      try {
        toast.loading("Loading...");
console.log("sed");
        const response = await axios.post("/api/user/reset-password", {
          data,
          token: params.token,
        });

        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          Navigate("/login");
        } else {
          toast.error(response.data.message);
        }
        // toast.dismiss();
      } catch (error) {
        toast.dismiss();
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Passwords Not Matched");
    }
  };

  return (
    <>
      <div className=" container-fluid resetbody">
        <div className=" resetbody1">
          <div className="resetmain">
            <h2> CHANGE YOUR PASSWORD</h2>
            <form className="resetform" onSubmit={handleSubmit(onSubmit)}>
              <div className="resetform_main">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 4,
                    maxLength: 20,
                  })}
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <p style={{ color: "red" }}>Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p style={{ color: "red" }}>Minimum 4!</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p style={{ color: "red" }}>Maximum 20!</p>
                )}
              </div>
              <div className="formdiv2">
                <label htmlFor="password"> Confirm Password</label>
                <input
                  type="password"
                  {...register("confirmpassword", { required: true })}
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <p style={{ color: "red" }}>Password is required</p>
                )}
              </div>

              <button className="register_button" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Resetpassword;
