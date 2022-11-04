import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../Redux/alertsSlice";
import { Breadcrumb, Layout, Menu } from 'antd';
import { toast } from 'react-hot-toast'
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import Button from 'react-bootstrap/Button';



const { Header, Content, Footer } = Layout;

function DoctorList() {

    const [doctors, setDoctors] = useState([]);
    const dispatch = useDispatch();
    const getDoctorsData = async () => {
        try {
            dispatch(showLoading());
            const resposne = await axios.get("/api/admin/get-all-doctors", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("user")}`,
                },
            });
            dispatch(hideLoading());
            if (resposne.data.success) {
                console.log(resposne.data.data)
                setDoctors(resposne.data.data);

            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };
    const changeDoctorStatus = async (record, status) => {
        try {
            dispatch(showLoading());
            const resposne = await axios.post(
                "/api/admin/change-doctor-account-status",
                { doctorId: record._id, userId: record.userId, status: status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("user")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (resposne.data.success) {
                toast.success(resposne.data.message);
                getDoctorsData();
            }
        } catch (error) {
            toast.error('Error changing doctor account status');
            dispatch(hideLoading());
        }
    };
    useEffect(() => {
        getDoctorsData();
    }, []);
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

            render: (text, record) => <img alt={record.image} src={record.image} style={{ width: "150px", height: "70px", objectFit: "contain" }} />
        },
        {
            title: "Phone",
            dataIndex: "phoneNumber",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY"),
        },
        {
            title: "Website",
            dataIndex: "website",
        },
        {
            title: "Address",
            dataIndex: "address",
        },
        {
            title: "Specialization",
            dataIndex: "specialization",
        },
        {
            title: "Experience",
            dataIndex: "experience"
        },
        {
            title: "FeePerCunsultation",
            dataIndex: "feePerCunsultation"
        },
        {
            title: "Time",
            dataIndex: "time",
            render: (text, record) => (
                <span>
                    {record.start}-{record.end}
                </span>
            ),



        },
        {
            title: "status",
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
                            onClick={() => changeDoctorStatus(record, "approved")}
                        >

                            <Button variant="success">Approve</Button>
                        </h1>
                    )}
                    {record.status === "approved" && (
                        <h1
                            className="anchor"
                            onClick={() => changeDoctorStatus(record, "blocked")}
                        >

                            <Button variant="danger">Block</Button>
                        </h1>
                    )}
                    {record.status === "blocked" && (
                        <h1
                            className="anchor"
                            onClick={() => changeDoctorStatus(record, "unblock")}
                        >
                            <Button variant="warning">UnBlock</Button>

                        </h1>
                    )}
                    {record.status === "unblock" && (
                        <h1
                            className="anchor"
                            onClick={() => changeDoctorStatus(record, "approved")}
                        >
                            <Button variant="success">Approve</Button>

                        </h1>
                    )}
                </div>
            ),
        },
    ];

    return (
        <>

            {/* <Layout className="layout">
                <Header>

                    <Navbar />
                </Header>
                <Content style={{ padding: '20px 150px' }}>


                    <h1 className="page-title">Doctors List</h1>
                    <hr />
                    <Table columns={columns} dataSource={doctors} />

                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Doctor ©2022 Created by Ameen UED
                </Footer>



            </Layout> */}


            <Navbar />

            <div className="container" style={{ paddingTop: "100px" }}>
                <h1 className="page-title">Doctors List</h1>
                <hr />
                {/* <Table columns={columns} dataSource={doctors} /> */}
                <Table
                    columns={columns}
                    dataSource={doctors}
                // scroll={{
                //     x: 500,
                // }}
                />

            </div>

        </>

    )
}

export default DoctorList
