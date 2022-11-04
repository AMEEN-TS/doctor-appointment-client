import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
// import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../Redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import moment from "moment";

function BookAppointment() {
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [phonenumber, setNumber] = useState();
  // const [date, setDate] = useState();
  // const [time, setTime] = useState();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(false);
  // const [max, setMax] = useState(new  Date());
  // const [min ,setMin] = useState(new Date());
  const times =7;

  
  console.log("timeeeeeeee", startDate)

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

const mytime =doctor?.start;
const mytimeto = doctor?.end;

  const starttime = moment(mytime, ["hh:mm a"]).format("HH:mm");
  const endtime=moment(mytimeto,["hh:mm a"]).format("HH:mm")
  

  const mintime = starttime.split(":")[0]
  const mintime_second = starttime.split(":")[1]
  const maxtime = endtime.split(":")[0]
  const maxtime_second = endtime.split(":")[1]

 
console.log(startDate,"oooooooooooooooooooooooo")

  const checkAvailability = async () => {
    if(startDate){
      try {
        dispatch(showLoading());
        const response = await axios.post(
          "/api/user/check-booking-avilability",
          {
            doctorId: params.doctorId,
            // date: date,
            // time: time,
            dateAndtime:startDate
  
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("user")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (response.data.success) {
          toast.success(response.data.message);
          setIsAvailable(true);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error booking appointment");
        dispatch(hideLoading());
      }
    }else{
      toast.error("Please Select Time and Date");
    }
    
  };
  const bookNow = async () => {
    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          dateAndtime:startDate,
          patientname: name,
          patientage: age,
          phonenumber: phonenumber,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {

        toast.success(response.data.message);
        navigate(`/checkout/${response.data.data._id}`)
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="bookbody" style={{ backgroundImage: "url(" + "https://img.freepik.com/free-photo/young-handsome-physician-medical-robe-with-stethoscope_1303-17818.jpg?w=996&t=st=1666095465~exp=1666096065~hmac=9909343caac8f3072ae7ac7f503e43ef9a0ea9c0a09f404c3f16d52c1af531a2" + ")", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
        <div className="container" style={{ paddingTop: "100px", }}>


          {doctor && (
            <div>
              <h1 className="page-title">
                {doctor?.firstName} {doctor?.lastName}
              </h1>
              <h4>
                {doctor?.specialization}
              </h4>
              <hr />
              <Row gutter={20} className="mt-5" align="middle">

                {/* <Col span={8} sm={24} xs={24} lg={8}>
              <img
                src="https://thumbs.dreamstime.com/b/finger-press-book-now-button-booking-reservation-icon-online-149789867.jpg"
                alt=""
                width="100%"
                height='400'
              />
            </Col> */}
                <Col span={8} sm={24} xs={24} lg={8} style={{ backgroundColor: "", borderStyle: "" }}>





                  <h3 className="normal-text" >
                    <b>Timings :</b>
                    {doctor?.start} - {doctor?.end}
                  </h3>
                  <hr />
                  {/* <p>
                <b>Phone Number : </b>
                {doctor?.phoneNumber}
              </p>
              <p>
                <b>Address : </b>
                {doctor?.address}
              </p>
              <p>
                <b>Fee per Visit : </b>
               Rs. {doctor?.feePerCunsultation} 
              </p>
              <p>
                <b>Website : </b>
                {doctor?.website}
              </p> */}

                  <Input size="large" name="name" placeholder="Patient Name" onChange={(e) => {
                    setName(e.target.value);

                  }} />
                  <br />
                  <br />
                  <Input size="large" name="age" placeholder="Patient age" onChange={(e) => {
                    setAge(e.target.value);

                  }} />
                  <br />
                  <br />
                  <Input size="large" name="number" placeholder="Phone Number" onChange={(e) => {
                    setNumber(e.target.value);

                  }} />
                  <br />

                  <div className="d-flex flex-column pt-2 mt-2 pb-2">


                    {/* <DatePicker
                      size="large"
                      format="DD-MM-YYYY"
                      onChange={(value) => {
                        setDate(moment(value).format("DD-MM-YYYY"));
                        setIsAvailable(false);
                      }}
                    /> */}
                    {/* <TimePicker
                      size="large"
                      use12Hours format="hh:mm a"
                      className="mt-3"
                      // disabledHours={() => [1, 2, 3]}
                      // minuteStep={30}
                      onChange={(value) => {
                        setIsAvailable(false);
                        setTime(moment(value, ["hh:mm a"]).format("hh:mm a"));
                      }}
                    /> */}
                    <DatePicker 
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      showTimeSelect
                      // showTimeSelectOnly
                      // excludeTimes={new Date(0, 0, 0, 11, 0)}
                      minTime={new Date(0, 0, 0, mintime, mintime_second)} // 7:00am
                      maxTime={new Date(0, 0, 0, maxtime, maxtime_second)} 
                      timeIntervals={30}
                      timeCaption="Time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                      placeholderText=" Date & Time"
                    />

                   


                    {!isAvailable && <Button
                      className="primary-button mt-3 full-width-button "
                      onClick={checkAvailability}
                    >
                      Check Availability
                    </Button>}

                    {isAvailable && (
                      <Button
                        className="primary-button mt-3 full-width-button "
                        onClick={bookNow}
                      >
                        Book Now
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BookAppointment;
