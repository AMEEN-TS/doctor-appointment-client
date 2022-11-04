
import React from 'react'
import Navbar from "../../components/Navbar";
import DoctorForm from '../../components/DoctorForm';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../Redux/alertsSlice';
import { toast } from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Layout, Menu } from 'antd';
import moment from "moment";

const { Header, Content, Footer } = Layout;

function ApplyDoctor() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log("values",values)
        try {
            dispatch(showLoading());
            const response = await axios.post(
                "/api/user/apply-doctor-account",
                {
                    ...values,
                    userId: user._id,
                    timings: [
                        moment(values.timings[0]).format("HH:mm"),
                        moment(values.timings[1]).format("HH:mm"),
                    ],
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
                navigate("/");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Something went wrong");
        }
    };
    return (
        <>



            <Layout className="layout">
                <Header>

                    <Navbar />
                </Header>
                <Content style={{ padding: '20px 150px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb> */}
                    {/* <div className="site-layout-content">Content</div> */}
                    <h1 className="page-title">Apply Doctor</h1>
                    <hr />

                    <DoctorForm onFinish={onFinish} />
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Doctor ©2022 Created by Ameen UED
                </Footer>



            </Layout>
        </>
    )
}

export default ApplyDoctor
