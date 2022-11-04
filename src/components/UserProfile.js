
import React, { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';

function UserProfile() {


  
    const { user } = useSelector((state) => state.user);


    console.log(user, "userrrrrrrrrrrrrrrrr")

    return (
        <>

            <div className="mainhome">

                <Navbar />

                <section style={{ backgroundColor: '#eee', paddingTop: "100px" }}>
                    <MDBContainer className="py-5">


                        <MDBRow>
                            <MDBCol lg="4">
                                <MDBCard className="mb-4">
                                    <MDBCardBody className="text-center">
                                        <MDBCardImage
                                            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
                                            alt="avatar"
                                            className=""
                                            style={{ width: '200px' }}
                                            fluid />
                                        {/* <p className="text-muted mb-1">Full Stack Developer</p>
              <p className="text-muted mb-4">Bay Area, San Francisco, CA</p> */}
                                        <div className="d-flex justify-content-center mb-2">
                                            {/* <MDBBtn>Follow</MDBBtn>
                <MDBBtn outline className="ms-1">Message</MDBBtn> */}
                                            <div className="m-3">
                                                <label className="mx-3">Choose file: </label>
                                                <input id="input-file" className="d-none" type="file" name="image" />

                                                <button className="btn btn-outline-primary">
                                                    Upload
                                                </button>
                                                {/* <Form.Group as={Row}>
                                                    <Form.File
                                                        type="file"
                                                        className="custom-file-label"
                                                        id="inputGroupFile01"
                                                          label="Choose file:"
                                                        //   onChange={(e) => setFileName(e.target.files[0].name)}
                                                        custom
                                                    />
                                                </Form.Group> */}
                                                {/* 
                                                <Form.Group controlId="formFile" className="mb-3">
                                                    <Form.Label>Choose file:</Form.Label>
                                                    <Form.Control type="file" />
                                                </Form.Group> */}

                                               


                                            </div>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>


                            </MDBCol>
                            <MDBCol lg="8">
                                <MDBCard className="mb-4">
                                    <MDBCardBody>
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Full Name</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">{user?.name}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Email</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">{user?.email}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Phone</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Mobile</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">9605236035</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Address</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>


                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
            </div>

        </>

    )
}

export default UserProfile
