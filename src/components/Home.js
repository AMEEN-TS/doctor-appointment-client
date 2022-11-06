import React, { useState, useEffect } from "react";
// import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from '../pages/Redux/alertsSlice';
import Navbar from "./Navbar";
import Doctor from "./Doctor";
import "../pages/style/user/home.css";
import axios from "axios";
import Carousel from "./Carousel";
import moment from "moment";
import { useNavigate } from "react-router-dom";


// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";


import {
  Card,
  Col,
  Row,
  Typography,
  Tooltip,
  Progress,
  Upload,
  message,
  Button,
  Timeline,
  Radio,
  Table,
} from "antd";
import {
  ToTopOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";
import toast from "react-hot-toast";
import { BaseUrl } from "../utils/BaseUlr";





function Home() {
  const { Title, Text } = Typography;
  const { user } = useSelector((state) => state.user);
  const [doctors, setDoctors] = useState([]);
  const [pendingdoctor, setPendingdoctor] = useState([]);
  const [pendingdoctorcount, setpendingdoctorcount] = useState([]);
  const [doctorapprovedcount, setdoctorapprovedcount] = useState([]);
  const [usercount, setusercount] = useState([]);
  const [appointmentcount, setappointmentcount] = useState([]);
  const [doctorPendingappointments, setDoctorPendingAppointments] = useState([]);
  const [doctorPendingappointmentscounts, setdoctorPendingappointmentscounts] = useState([]);
  const [totalappointmentscount, settotalappoinmentscount] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    doctorhome();
    getData();
    doctorPending();
   
  }, []);

  

  const getData = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.get(`${BaseUrl}/api/user/get-all-approved-doctors`,

      );
      dispatch(hideLoading())
      if (response.data.success) {
        setDoctors(response.data.data);
        console.log(response.data.data,"ggggggggggggggggggggg")
      }
    } catch (error) {
      dispatch(hideLoading())
    }
  };

  const doctorPending = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/api/admin/get-pending-doctor`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      if (response.data.success) {
        setPendingdoctor(response.data.data);
        setpendingdoctorcount(response.data.datacount);
        setdoctorapprovedcount(response.data.doctorcount);
        setusercount(response.data.usercount);
        setappointmentcount(response.data.appointmentcount)
      }
    } catch (error) {

    }
  };

  const doctorhome = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/api/doctor/doctorhome`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      if (response.data.success) {
        setDoctorPendingAppointments(response.data.data);
        setdoctorPendingappointmentscounts(response.data.appointmentcount);
        settotalappoinmentscount(response.data.totalappointmentscount)
      }
      console.log(response.data.success);
    } catch (error) {

    }
  };

  // const searchdoctors = async (event) =>{
   
  //   let key = event.target.value;
    
  
  //   const response = await axios.get(`${BaseUrl}/api/doctor/searchdoctors/${key}`)
    
  // }


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",

      render: (text, record) => <img alt={record.image} src={record.image} style={{ width: "150px", height: "70px", objectFit: "contain", }} />
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    // {
    //     title: "Created At",
    //     dataIndex: "createdAt",
    //     render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY"),
    // },
    // {
    //     title: "Website",
    //     dataIndex: "website",
    // },
    // {
    //     title: "Address",
    //     dataIndex: "address",
    // },
    {
      title: "Specialization",
      dataIndex: "specialization",
    },
    {
      title: "Experience",
      dataIndex: "experience"
    },
    // {
    //     title: "FeePerCunsultation",
    //     dataIndex: "feePerCunsultation"
    // },
    // {
    //     title: "Time",
    //     dataIndex: "time",
    //     render: (text, record) => (
    //         <span>
    //             {record.start}-{record.end}
    //         </span>
    //     ),



    // },
    {
      title: "status",
      dataIndex: "status",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <h6 className="" style={{ color: "red" }}>
              {/* <Button variant="danger">Pending</Button> */}
              Pending
            </h6>
          )}
        </div>
      )
    },

  ];

  const doctorcolumns = [
    // {
    //   title: "Id",
    //   dataIndex: "_id",
    // },
    {
      title: "Patient Name",
      dataIndex: "name",
      render: (text, record) => <span>{record.patientname}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => <span>{record.phonenumber}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {/* {moment(record.date).format("DD-MM-YYYY")}{" "}
          {moment(record.time).format("HH:mm")} */}
          {record.dateAndtime}
        </span>
      ),
    },
    {
      title: "Payment",
      dataIndex: "payment",
      render: (text, record) => <span>{record.payment}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "Pending" && (
            <h6 className="" style={{ color: "red" }}>
              {/* <Button variant="danger">Pending</Button> */}
              Pending
            </h6>
          )}
        </div>
      )
    },

  ];

  const dollor = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M8.43338 7.41784C8.58818 7.31464 8.77939 7.2224 9 7.15101L9.00001 8.84899C8.77939 8.7776 8.58818 8.68536 8.43338 8.58216C8.06927 8.33942 8 8.1139 8 8C8 7.8861 8.06927 7.66058 8.43338 7.41784Z"
        fill="#fff"
      ></path>
      <path
        d="M11 12.849L11 11.151C11.2206 11.2224 11.4118 11.3146 11.5666 11.4178C11.9308 11.6606 12 11.8861 12 12C12 12.1139 11.9308 12.3394 11.5666 12.5822C11.4118 12.6854 11.2206 12.7776 11 12.849Z"
        fill="#fff"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 5C11 4.44772 10.5523 4 10 4C9.44772 4 9 4.44772 9 5V5.09199C8.3784 5.20873 7.80348 5.43407 7.32398 5.75374C6.6023 6.23485 6 7.00933 6 8C6 8.99067 6.6023 9.76515 7.32398 10.2463C7.80348 10.5659 8.37841 10.7913 9.00001 10.908L9.00002 12.8492C8.60902 12.7223 8.31917 12.5319 8.15667 12.3446C7.79471 11.9275 7.16313 11.8827 6.74599 12.2447C6.32885 12.6067 6.28411 13.2382 6.64607 13.6554C7.20855 14.3036 8.05956 14.7308 9 14.9076L9 15C8.99999 15.5523 9.44769 16 9.99998 16C10.5523 16 11 15.5523 11 15L11 14.908C11.6216 14.7913 12.1965 14.5659 12.676 14.2463C13.3977 13.7651 14 12.9907 14 12C14 11.0093 13.3977 10.2348 12.676 9.75373C12.1965 9.43407 11.6216 9.20873 11 9.09199L11 7.15075C11.391 7.27771 11.6808 7.4681 11.8434 7.65538C12.2053 8.07252 12.8369 8.11726 13.254 7.7553C13.6712 7.39335 13.7159 6.76176 13.354 6.34462C12.7915 5.69637 11.9405 5.26915 11 5.09236V5Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const profile = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 6C9 7.65685 7.65685 9 6 9C4.34315 9 3 7.65685 3 6C3 4.34315 4.34315 3 6 3C7.65685 3 9 4.34315 9 6Z"
        fill="#fff"
      ></path>
      <path
        d="M17 6C17 7.65685 15.6569 9 14 9C12.3431 9 11 7.65685 11 6C11 4.34315 12.3431 3 14 3C15.6569 3 17 4.34315 17 6Z"
        fill="#fff"
      ></path>
      <path
        d="M12.9291 17C12.9758 16.6734 13 16.3395 13 16C13 14.3648 12.4393 12.8606 11.4998 11.6691C12.2352 11.2435 13.0892 11 14 11C16.7614 11 19 13.2386 19 16V17H12.9291Z"
        fill="#fff"
      ></path>
      <path
        d="M6 11C8.76142 11 11 13.2386 11 16V17H1V16C1 13.2386 3.23858 11 6 11Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const heart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
        fill="#fff"
      ></path>
    </svg>,
  ];
  const cart = [
    <svg
      width="22"
      height="22"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2C7.79086 2 6 3.79086 6 6V7H5C4.49046 7 4.06239 7.38314 4.00612 7.88957L3.00612 16.8896C2.97471 17.1723 3.06518 17.455 3.25488 17.6669C3.44458 17.8789 3.71556 18 4 18H16C16.2844 18 16.5554 17.8789 16.7451 17.6669C16.9348 17.455 17.0253 17.1723 16.9939 16.8896L15.9939 7.88957C15.9376 7.38314 15.5096 7 15 7H14V6C14 3.79086 12.2091 2 10 2ZM12 7V6C12 4.89543 11.1046 4 10 4C8.89543 4 8 4.89543 8 6V7H12ZM6 10C6 9.44772 6.44772 9 7 9C7.55228 9 8 9.44772 8 10C8 10.5523 7.55228 11 7 11C6.44772 11 6 10.5523 6 10ZM13 9C12.4477 9 12 9.44772 12 10C12 10.5523 12.4477 11 13 11C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9Z"
        fill="#fff"
      ></path>
    </svg>,
  ];

  const count = [
    {
      today: "Users",
      title: `${usercount}`,
      // persent: "+30%",
      icon: dollor,
      bnb: "bnb2",
    },
    {
      today: "Doctors",
      title: `${doctorapprovedcount}`,
      // persent: "+20%",
      icon: profile,
      bnb: "bnb2",
    },
    {
      today: "Pending Doctors",
      title: `${pendingdoctorcount}`,
      // persent: "-20%",
      icon: heart,
      bnb: "redtext",
    },
    {
      today: "Total Appointments",
      title: `${appointmentcount}`,
      // persent: "10%",
      icon: cart,
      bnb: "bnb2",
    },
  ];
  const doctorcount = [
    // {
    //   today: "Users",
    //   title: `${usercount}`,
    //   // persent: "+30%",
    //   icon: dollor,
    //   bnb: "bnb2",
    // },
    // {
    //   today: "Doctors",
    //   title: `${doctorapprovedcount}`,
    //   // persent: "+20%",
    //   icon: profile,
    //   bnb: "bnb2",
    // },
    {
      today: "Pending Appointments",
      title: `${doctorPendingappointmentscounts}`,
      // persent: "-20%",
      icon: heart,
      bnb: "redtext",
    },
    {
      today: "Total Appointments",
      title: `${totalappointmentscount}`,
      // persent: "10%",
      icon: cart,
      bnb: "bnb2",
    },
  ];

  const keys=["firstName","specialization"]
  return (
    <>
      <div className="mainhome">


        <Navbar />

        {user?.isAdmin ? (
          <>
            <Navbar />
            <div className="container">
              <div className="layout-content" style={{ paddingTop: "100px" }}>



                <Row className="rowgap-vbox" gutter={[24, 0]}>
                  {count.map((c, index) => (
                    <Col
                      key={index}
                      xs={24}
                      sm={24}
                      md={12}
                      lg={6}
                      xl={6}
                      className="mb-24"

                    >
                      <Card bordered={false} className="criclebox " style={{ backgroundColor: "", borderRadius: 10 }} >
                        <div className="number">
                          <Row align="middle" gutter={[24, 0]}>
                            <Col xs={18}>
                              <span style={{ fontWeight: "bolder" }}>{c.today}</span>
                              <Title level={3} style={{ fontWeight: "bolder", color: "#063970" }} >
                                {c.title} <small className={c.bnb}>{c.persent}</small>
                              </Title>
                            </Col>
                            <Col xs={6}>
                              <div className="icon-box">{c.icon}</div>
                            </Col>
                          </Row>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>

              </div>

              <div style={{ paddingTop: "50px" }}>

                <Row gutter={[24, 0]}>
                  {/* <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col> */}
                  <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
                    <Card bordered={false} className="criclebox h-full" style={{ borderRadius: 10 }}>
                      <h1 className="page-title" >Doctors List</h1>
                      <div className="d-flex justify-content-end" >
                        <button className='btn ' style={{ background: '#063970', color: 'white' }} onClick={() => navigate("/admin/doctorslist")} >
                          View All
                        </button>
                      </div>


                      <hr />

                      <Table
                        columns={columns}
                        dataSource={pendingdoctor}

                      />
                    </Card>
                  </Col>
                </Row>
              </div>

            </div>





          </>


        ) : user?.isDoctor ? (
          <>
            <Navbar />
            <div className="container">
              <div className="layout-content" style={{ paddingTop: "100px", }}>



                <Row className="rowgap-vbox" gutter={[24, 0]}>
                  {doctorcount.map((c, index) => (
                    <Col
                      key={index}
                      xs={24}
                      sm={24}
                      md={12}
                      lg={6}
                      xl={6}
                      className="mb-24"

                    >
                      <Card bordered={false} className="criclebox " style={{ backgroundColor: "", borderRadius: 10 }} >
                        <div className="number">
                          <Row align="middle" gutter={[50, 0]}>
                            <Col xs={18}>
                              <span style={{ fontWeight: "bolder" }}>{c.today}</span>
                              <Title level={3} style={{ fontWeight: "bolder", color: "#063970" }} >
                                {c.title} <small className={c.bnb}>{c.persent}</small>
                              </Title>
                            </Col>
                            <Col xs={6}>
                              <div className="icon-box">{c.icon}</div>
                            </Col>
                          </Row>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>

              </div>

              <div style={{ paddingTop: "50px", paddingBottom: "25px" }}>

                <Row gutter={[24, 0]}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
                    <Card bordered={false} className="criclebox h-full">

                    </Card>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
                    <Card bordered={false} className="criclebox h-full" style={{ borderRadius: 10 }}>
                      <h1 className="page-title" >Appointments </h1>
                      <div className="d-flex justify-content-end" >
                        <button className='btn ' style={{ background: '#063970', color: 'white' }} onClick={() => navigate("/doctor/appointments")} >
                          View All
                        </button>
                      </div>


                      <hr />

                      <Table
                        columns={doctorcolumns}
                        dataSource={doctorPendingappointments}

                      />


                    </Card>
                  </Col>
                </Row>
              </div>

            </div>

          </>

        ) :
          <>
            <Navbar />
            <div>



              <div style={{ paddingTop: "65px", }}>
                <Carousel />

              </div>
              <div className="container homesearch">
                <div className="search-div">
                  <input type="" className="search-box" placeholder="Search..." onChange={(e)=>setQuery(e.target.value)}></input>
                </div>

              </div>
              <div className="container" style={{ paddingTop: "50px", paddingBottom: "10px" }}>

                <Row gutter={[30, 40]}>
                  
                  {/* {doctors.map((doctor) => (
                    <Col span={6} xs={24} sm={12} md={12} lg={8} xl={8}>
                      <Doctor doctor={doctor} />
                    </Col>
                  ))} */}
                  {doctors.filter((doctor) =>
                  doctor.specialization.toLowerCase().includes(query) || doctor.firstName.toLowerCase().includes(query) 
                  ).map((doctor) => (
                    <Col span={6} xs={24} sm={12} md={12} lg={8} xl={8}>
                      <Doctor doctor={doctor} />
                    </Col>
                  ))}
                  
                </Row>

              </div>
            </div>
          </>



        }



      </div>

    </>
  );
}

export default Home;



