import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../Redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

function DoctorHome() {

    const [doctor, setDoctor] = useState(null);
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getDoctorData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post(
                "/api/doctor/get-doctor-info-by-id",
                {
                    doctorId: params.doctorId,
                },
                
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

    useEffect(() => {
        getDoctorData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="gradient-custom-2" style={{ backgroundColor: '', paddingTop: "50px",backgroundImage:"url(" + "https://plus.unsplash.com/premium_photo-1661698939645-8c8690757830?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" + ")" ,backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol lg="9" xl="7">
                            <MDBCard>
                                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#063970', height: '200px' }}>
                                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                                        <MDBCardImage src={doctor?.image}
                                            alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                                        {/* <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                    Edit profile
                  </MDBBtn> */}
                                    </div>
                                    <div className="ms-3" style={{ marginTop: '130px' }}>
                                        <MDBTypography tag="h5">{doctor?.firstName} {doctor?.lastName}</MDBTypography>
                                        <MDBCardText> {doctor?.specialization}</MDBCardText>
                                    </div>
                                </div>
                                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>

                                </div>
                                <MDBCardBody className="text-black p-4">
                                    <div className="mb-3">
                                        <p className="lead fw-normal mb-1">About</p>
                                        <div className="p-2" style={{ backgroundColor: '#f8f9fa' }}>
                                            <MDBCardText className="font-italic mb-1">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</MDBCardText>
                                            {/* <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
                    <MDBCardText className="font-italic mb-0">Photographer</MDBCardText> */}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <p className="lead fw-normal mb-1"><MDBIcon fas icon="map-marker-alt" />Address</p>
                                        <div className="p-2" style={{ backgroundColor: '#f8f9fa' }}>
                                            <MDBCardText className="font-italic mb-1">{doctor?.address}</MDBCardText>
                                            {/* <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
                    <MDBCardText className="font-italic mb-0">Photographer</MDBCardText> */}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <p className="lead fw-normal mb-1">Phone Number </p>
                                        <div className="p-2" style={{ backgroundColor: '#f8f9fa' }}>
                                            <MDBCardText className="font-italic mb-1">{doctor?.phoneNumber}</MDBCardText>


                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <p className="lead fw-normal mb-1">Timings </p>
                                        <div className="p-2" style={{ backgroundColor: '#f8f9fa' }}>
                                            <MDBCardText className="font-italic mb-1">  {doctor?.start}-{doctor?.end} </MDBCardText>


                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <p className="lead fw-normal mb-1">Fee per Visit </p>
                                        <div className="p-2" style={{ backgroundColor: '#f8f9fa' }}>
                                            <MDBCardText className="font-italic mb-1"> Rs. {doctor?.feePerCunsultation} </MDBCardText>


                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <p className="lead fw-normal mb-1">Experience </p>
                                        <div className="p-2" style={{ backgroundColor: '#f8f9fa' }}>
                                            <MDBCardText className="font-italic mb-1">  {doctor?.experience}-Year </MDBCardText>


                                        </div>
                                    </div>

                                    <MDBBtn className="float-end" color="success" rounded block size="lg"  onClick={() => navigate(`/book-appointment/${doctor._id}`)} >
                                        <MDBIcon far icon="clock me-2" /> Make An Appointment
                                    </MDBBtn>

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </>
    )
}

export default DoctorHome
