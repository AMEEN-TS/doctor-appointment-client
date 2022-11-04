import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../Redux/alertsSlice";
import { setUser } from '../Redux/userSlice';
import Navbar from "../../components/Navbar";
import { Breadcrumb, Layout, Menu } from 'antd';
import { Button } from 'antd';
import { Tabs } from "antd";
import axios from "axios";
import toast from "react-hot-toast";



const { Header, Content, Footer } = Layout;

function Notifications() {


    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const markAllAsSeen = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/user/mark-all-notifications-as-seen", { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("user")}`
                }
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message)
                dispatch(setUser(response.data.data));
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            toast.error("Something went wrong");
        }
    }

    const deleteAll=async()=>{
        try {
            dispatch(showLoading());
            const response = await axios.post("/api/user/delete-all-notifications", {userId : user._id} , {
                headers: {
                    Authorization : `Bearer ${localStorage.getItem("user")}`
                }
            });
            dispatch(hideLoading());
            if (response.data.success) {
              toast.success(response.data.message)
              dispatch(setUser(response.data.data));
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            dispatch(hideLoading());
            toast.error("Something went wrong");
          }
      }

    return (
        <>


            <Layout className="layout">
                <Header>

                    <Navbar />
                </Header>
                <Content style={{ padding: '20px 150px', minHeight: '100vh' }}>

                    <h1 className="page-title">Notifications</h1>


                    <hr />
                    <Tabs>

                        <Tabs.TabPane type="card" tab="Unseen" key={0}>
                            <div className="d-flex justify-content-end">
                                <Button primary><h1 className="anchor" onClick={()=>markAllAsSeen()}>Mark all as seen</h1></Button>

                            </div>

                            {user?.unseenNotifications.map((notification) => (
                                <div className="card p-2 mt-2" onClick={()=>navigate(notification.onClickPath)} >
                                    <div className="card-text notification">{notification.message}</div>
                                </div>
                            ))}
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="seen" key={1}>
                            <div className="d-flex justify-content-end">
                                <Button danger>
                                    <h1 className="anchor" onClick={()=>deleteAll()} >Delete all</h1>
                                </Button>

                            </div>
                            {user?.seenNotifications.map((notification) => (
            <div className="card p-2 mt-2" >
                <div className="card-text ">{notification.message}</div>
            </div>
          ))}
                        </Tabs.TabPane>
                    </Tabs>

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

export default Notifications
