import React, { useEffect, useState } from 'react'
import Navbar from "../../components/Navbar";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../Redux/alertsSlice";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";
import Button from 'react-bootstrap/Button';
import { toast } from 'react-hot-toast'
function UserList() {

    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();
    const getUsersData = async () => {
        try {
            dispatch(showLoading());
            const resposne = await axios.get("/api/admin/get-all-users", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("user")}`,
                },
            });
            dispatch(hideLoading());
            if (resposne.data.success) {
                setUsers(resposne.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
        }
    };

    const changeUserStatus = async (record, status) => {
        try {
            dispatch(showLoading());
            const resposne = await axios.post(
                "/api/admin/change-user-account-status",
                {  userid: record._id, status: status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("user")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (resposne.data.success) {
                toast.success(resposne.data.message);
                getUsersData();
            }
        } catch (error) {
            toast.error('Error changing doctor account status');
            dispatch(hideLoading());
        }
    };

    

    useEffect(() => {
        getUsersData();
    }, []);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            
            render: ( text,record) => moment(record.createdAt).format("DD/MM/YYYY"),
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                      {record.isBlock === "unBlock" && (
                        <h1
                            className="anchor"
                            onClick={() => changeUserStatus(record, "block")}
                        >

                            <Button variant="danger">Block</Button>
                        </h1>
                    )}
                    {record.isBlock === "block" && (
                        <h1
                            className="anchor"
                            onClick={() => changeUserStatus(record, "unBlock")}
                        >

                            <Button variant="warning">Unblock</Button>
                        </h1>
                    )}
                </div>
            ),
        },
    ];
   
    return (
        <>
            <Navbar />

            <div className="container" style={{ paddingTop: "100px" }}>

                <h1 className="page-title">Users List</h1>
                <hr />
                <Table columns={columns} dataSource={users} />
            </div>

        </>
    )
}

export default UserList
