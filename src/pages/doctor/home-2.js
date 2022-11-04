import React from 'react';
import Navbar from "../../components/Navbar";
import { Button, Col, DatePicker, Form, Input, Row, TimePicker } from "antd";


function DoctorHome() {
    return (
        <>
            <div className="mainhome">

            
            <Navbar />

            <div className="container" style={{ paddingTop: "100px", }}>
                {/* 
                <h1>Doctor</h1> */}

                <Row gutter={20}>
                    <Col span={8}>
                        <div className="doctordetails" style={{ width: "100%", height: 400, backgroundColor: "white" }}>
                            <div className="doctorbody" style={{ width: "100%", height: 150, }}>
                                <div className="doctorimage" >


                                </div>
                            </div>

                            <div style={{ width: "100%", height: 200, textAlign: "center" }}>
                                <h1>ameen</h1>
                                <hr />
                                <h1>ajmal</h1>

                            </div>






                        </div>
                    </Col>
                    <Col span={16}>
                        <div className="doctorsecondbody" style={{ width: "100%", height: 400, backgroundColor: "white", marginTop: "10px" }}>

                            <div style={{ width: "100%", height: "70px", background: "#063970", color: "white", fontSize: "30px", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>

                                Doctor-Profile
                            </div>
                            <div style={{ padding: "50px" }}>
                                <h3 className="normal-text" >
                                    <b>Timings :</b>

                                </h3>
                                <hr />
                                <p>
                                    <b>Phone Number : </b>
                                    <hr />
                                </p>
                                <p>
                                    <b>Address : </b>
                                    <hr />
                                </p>
                                <p>
                                    <b>Fee per Visit : </b>
                                    Rs.
                                    <hr />
                                </p>
                                <p>
                                    <b>Website : </b>
                                    <hr />

                                </p>
                            </div>

                        </div>
                    </Col>

                </Row>

            </div>
            </div>
        </>
    )
}

export default DoctorHome
