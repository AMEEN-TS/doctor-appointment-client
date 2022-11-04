import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table } from "antd";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { toast } from "react-hot-toast";
import { showLoading, hideLoading } from "../Redux/alertsSlice";
import Button from "react-bootstrap/Button";
import { BaseUrl } from "../../utils/BaseUlr";

function Allappointments() {
  const [appointments, setAppointments] = useState();
  const dispatch = useDispatch();

  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(`${BaseUrl}/api/admin/get-all-appointmenst`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user")}`,
        },
      });
      if(response.data.success){
        dispatch(hideLoading());
        setAppointments(response.data.data)
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error(" something Error");
    }
  };

  const columns = [
    // {
    //     title: "Id",
    //     dataIndex: "_id",
    // },
    {
      title: "Doctor",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </span>
      ),
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
      render: (text, record) => <span>{record.doctorInfo.specialization}</span>,
    },
    {
      title: "patient Name",
      dataIndex: "patientname",
      render: (text, record) => <span>{record.patientname}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => <span>{record.doctorInfo.phoneNumber}</span>,
    },
    {
      title: "Location",
      dataIndex: "location",
      render: (text, record) => <span>{record.doctorInfo.address}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => <span>{record.dateAndtime}</span>,
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
            <h6 className="" style={{color:"red"}}>
              {/* <Button variant="danger">Pending</Button> */}
              Pending
            </h6>
          )}
          {record.status === "Approved" && (
            <h6 className="" style={{color:"green"}}>
              {/* <Button variant="success">Approved</Button> */}
              Approved
            </h6>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAppointmentsData();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container" style={{ paddingTop: "100px" }}>
        <h1 className="page-title">Appointments</h1>
        <hr />
        <Table columns={columns} dataSource={appointments} />
      </div>
    </>
  );
}

export default Allappointments;
