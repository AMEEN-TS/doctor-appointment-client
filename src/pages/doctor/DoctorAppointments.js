import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import { showLoading, hideLoading } from "../Redux/alertsSlice";
import Navbar from "../../components/Navbar";
import Button from "react-bootstrap/Button";
import { BaseUrl } from "../../utils/BaseUlr";

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get(
        `${BaseUrl}/api/doctor/get-appointments-by-doctor-id`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const resposne = await axios.post(
        `${BaseUrl}/api/doctor/change-appointment-status`,
        { appointmentId: record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        toast.success(resposne.data.message);
        getAppointmentsData();
      }
    } catch (error) {
      toast.error("Error changing doctor account status");
      dispatch(hideLoading());
    }
  };
  const columns = [
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
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
     
            <div className="d-flex">
              {record.status === "Pending" && (
                <h1
                  className="anchor"
                  onClick={() => changeAppointmentStatus(record, "Approved")}
                >
                  <Button variant="success">Approve</Button>
                </h1>
              )}
              {record.status === "Approved" && (
                <h1
                  className="anchor"
                  onClick={() => changeAppointmentStatus(record, "Rejected")}
                >
                  <Button variant="danger">rejected</Button>
                </h1>
              )}
              {record.status === "Rejected" && (
                <h1
                  className="anchor"
                  onClick={() => changeAppointmentStatus(record, "Approved")}
                >
                  <Button variant="success">Approve</Button>
                </h1>
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

export default DoctorAppointments;
