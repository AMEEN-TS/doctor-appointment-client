import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../Redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRadio,
    MDBRow,
    MDBCardText
} from "mdb-react-ui-kit";
import Doctor from "../../components/Doctor";
import { BaseUrl } from "../../utils/BaseUlr";

export default function App() {
    const navigate = useNavigate()
    const params = useParams();
    const dispatch = useDispatch();
    const [data, setData] = useState();
    const [cod, setCod] = useState(false);
    const [online, setOnline] = useState(false);

    const setruecod = () => {
        setCod(true);
    }

    const settrueonline = () => {
        setOnline(true);
        setCod(false);
    }



    const getData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post(
                `${BaseUrl}/api/user/get-appointment-details-by-id`,
                {
                    appointmentId: params.appointmentId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("user")}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (response.data.success) {
                setData(response.data.data);

            }
        } catch (error) {

            toast.error("Error ");
            dispatch(hideLoading());

        }
    };


    const initPayment = (data) => {

        const options = {
            key:  process.env.RAZORPAY_ID,
            amount: data.amount,
            currency: data.currency,
            name: "aaaaa",
            description: "Test Transaction",
            image: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const verifyUrl = `${BaseUrl}/api/user/verify`;
                    const { data } = await axios.post(verifyUrl, response);
                    if (data.success) {
                        navigate('/')
                        toast.success(data.message);
                    }
                    console.log(data);
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#3399cc",
            },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    const amount = data?.doctorInfo.feePerCunsultation

    const payment = async () => {

        if (online) {

            try {

                const { data } = await axios.post(
                    `${BaseUrl}/api/user/checkout`,
                    {
                        appointmentId: params.appointmentId,
                        amount
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("user")}`,
                        },

                    }
                );


                initPayment(data.data);



            } catch (error) {
                toast.error("something Error")
            }

        } else if (cod) {
            dispatch(showLoading());
            try {
                const response = await axios.post(
                    `${BaseUrl}/api/user/cashpayment`,
                    {
                        appointmentId: params.appointmentId,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("user")}`,
                        },
                    }
                );
                dispatch(hideLoading());
                if(response.data.success){
                    navigate('/')
                    toast.success(response.data.message);
                }


            } catch (error) {
                dispatch(hideLoading());
                toast.error("Error ");
            }

        }

    };







    useEffect(() => {
        getData();
    }, []);


    return (
        <>
            <div className="mainhome">


                <Navbar />

                <MDBContainer fluid className="container" style={{ backgroundColor: "#eee", paddingTop: "100px", paddingBottom: "50px" }}>

                    <MDBCard >
                        <MDBCardBody>
                            <MDBRow className="d-flex justify-content-center pb-5">

                                <MDBCol md="7" xl="5" className="mb-4 mb-md-0">


                                    <div className="py-4 d-flex flex-row">
                                        <h5>
                                            <span className="far fa-check-square pe-2"></span>
                                            <b>ELIGIBLE</b> |
                                        </h5>
                                        <span className="ps-2">Pay</span>
                                    </div>
                                    <h4>Basic Informations</h4>
                                    <hr />
                                    <MDBCardText>
                                        <div style={{ paddingTop: "5px" }}>
                                            {/* <h3 className="normal-text" >
                                    <b>Timings :</b>

                                </h3>
                                <hr /> */}
                                            <div className="d-flex flex-column">


                                                <p>
                                                    {/* <b>Patient Name: </b>
                                                    <span style={{ paddingLeft: "25px", fontSize: "18px", fontWeight: "revert-layer" }}>
                                                        {data?.patientname}
                                                    </span> */}

                                                    <div className="p-2 d-flex">
                                                        <b>Patient Name: </b>
                                                        <div className="ms-auto">
                                                            <span style={{ fontSize: "18px", fontWeight: "bolder" }}>
                                                                {data?.patientname}
                                                            </span>
                                                        </div>
                                                    </div>

                                                </p>
                                                <p>
                                                    {/* <b>Patient Age:</b>
                                                    <span style={{ paddingLeft: "25px", fontSize: "18px", fontWeight: "revert-layer" }}>
                                                        {data?.patientage}
                                                    </span> */}

                                                    <div className="p-2 d-flex">
                                                        <b>Patient Age:</b>
                                                        <div className="ms-auto">
                                                            <span style={{ fontSize: "18px", fontWeight: "bolder" }}>
                                                                {data?.patientage}
                                                            </span>
                                                        </div>
                                                    </div>

                                                </p>
                                                <p>
                                                    {/* <b>Phone Number : </b>
                                                    <span style={{ paddingLeft: "25px", fontSize: "18px", fontWeight: "revert-layer" }}>
                                                        {data?.phonenumber}
                                                    </span> */}

                                                    <div className="p-2 d-flex">
                                                        <b>Phone Number : </b>
                                                        <div className="ms-auto">
                                                            <span style={{ fontSize: "18px", fontWeight: "bolder" }}>
                                                                {data?.phonenumber}
                                                            </span>
                                                        </div>
                                                    </div>


                                                </p>
                                                <p>
                                                    {/* <b>Address : </b>
                                                    <span style={{ paddingLeft: "25px", fontSize: "18px", fontWeight: "revert-layer" }}>
                                                        {data?.doctorInfo.address}
                                                    </span> */}

                                                    <div className="p-2 d-flex">
                                                        <b>Address : </b>
                                                        <div className="ms-auto">
                                                            <span style={{ fontSize: "18px", fontWeight: "bolder" }}>
                                                                {data?.doctorInfo.address}
                                                            </span>
                                                        </div>
                                                    </div>


                                                </p>
                                                <p>
                                                    {/* <b>Consultant Doctor : </b>
                                                    <span style={{ paddingLeft: "25px", fontSize: "18px", fontWeight: "revert-layer" }}>
                                                        Dr.{data?.doctorInfo.firstName} {data?.doctorInfo.lastName}
                                                    </span> */}

                                                    <div className="p-2 d-flex">
                                                        <b>Consultant Doctor : </b>
                                                        <div className="ms-auto">
                                                            <span style={{ fontSize: "18px", fontWeight: "bolder" }}>
                                                                Dr.{data?.doctorInfo.firstName} {data?.doctorInfo.lastName}
                                                            </span>
                                                        </div>
                                                    </div>


                                                </p>
                                                <p>
                                                    {/* <b>Specialization: </b>
                                                    <span style={{ paddingLeft: "25px", fontSize: "18px", fontWeight: "revert-layer" }}>
                                                        {data?.doctorInfo.specialization}
                                                    </span> */}

                                                    <div className="p-2 d-flex">
                                                        <b>Specialization: </b>
                                                        <div className="ms-auto">
                                                            <span style={{ fontSize: "18px", fontWeight: "bolder" }}>
                                                                {data?.doctorInfo.specialization}
                                                            </span>
                                                        </div>
                                                    </div>

                                                </p>

                                            </div>

                                        </div>
                                    </MDBCardText>
                                    {/* <h4 className="text-success">$85.00</h4>
                            <h4>Diabetes Pump &amp; Supplies</h4>
                            <div className="d-flex pt-2">
                                <div>
                                    <p>
                                        <b>
                                            Insurance Responsibility{" "}
                                            <span className="text-success">$71.76</span>
                                        </b>
                                    </p>
                                </div>
                                <div className="ms-auto">
                                    <p className="text-primary">
                                        <MDBIcon
                                            fas
                                            icon="plus-circle"
                                            className="text-primary pe-1"
                                        />
                                        Add insurance card
                                    </p>
                                </div>
                            </div>
                            <p>
                                Insurance claims and all necessary dependencies will be
                                submitted to your insurer for the coverred portion of this order
                            </p>
                            <div
                                className="rounded d-flex"
                                style={{ backgroundColor: "#f8f9fa" }}
                            >
                                <div className="p-2">Aetna-Open Access</div>
                                <div className="ms-auto p-2">OAP</div>
                            </div>
                            <hr /> */}
                                    <div className="pt-2">
                                        {/* <div className="d-flex pb-2">
                                    <div>
                                        <p>
                                            <b>
                                                Patient Balance{" "}
                                                <span className="text-success">$13.24</span>
                                            </b>
                                        </p>
                                    </div>
                                    <div className="ms-auto">
                                        <p className="text-primary">
                                            <MDBIcon
                                                fas
                                                icon="plus-circle"
                                                className="text-primary pe-1"
                                            />
                                            Add payment card
                                        </p>
                                    </div>
                                </div> */}
                                        {/* <p>
                                    This is an estimate for the portion of your order (not covered
                                    by insurance) due today . once insurance finalizes their
                                    review refunds and/or balances will reconcile automatically.
                                </p> */}

                                    </div>
                                </MDBCol>
                                <MDBCol className="pt-5" md="5" xl="4" offsetXl="1">
                                    {" "}
                                    <div className="py-4 d-flex justify-content-end">
                                        <h6>
                                            <a href="/">Cancel and return to website</a>
                                        </h6>
                                    </div>
                                    <div
                                        className="rounded d-flex flex-column p-2"
                                        style={{ backgroundColor: "#f8f9fa" }}
                                    >
                                        <div className="p-2 me-3">
                                            <h4>Order Recap</h4>
                                        </div>
                                        <div className="p-2 d-flex">
                                            <MDBCol size="8">Consultant fee</MDBCol>
                                            <div className="ms-auto">{data?.doctorInfo.feePerCunsultation}</div>
                                        </div>
                                        {/* <div className="p-2 d-flex">
                                            <MDBCol size="8">Amount toward deductible</MDBCol>
                                            <div className="ms-auto">$0.00</div>
                                        </div>
                                        <div className="p-2 d-flex">
                                            <MDBCol size="8">Coinsurance(0%)</MDBCol>
                                            <div className="ms-auto">+ $0.00</div>
                                        </div>
                                        <div className="p-2 d-flex">
                                            <MDBCol size="8">Copayment</MDBCol>
                                            <div className="ms-auto">+ $40.00</div>
                                        </div>
                                        <div className="border-top px-2 mx-2"></div>
                                        <div className="p-2 d-flex pt-3">
                                            <MDBCol size="8">
                                                Total Deductible, Coinsurance, and Copay
                                            </MDBCol>
                                            <div className="ms-auto">$40.00</div>
                                        </div>
                                        <div className="p-2 d-flex">
                                            <MDBCol size="8">
                                                Maximum out-of-pocket on Insurance Policy (not reached)
                                            </MDBCol>
                                            <div className="ms-auto">$6500.00</div>
                                        </div>
                                        <div className="border-top px-2 mx-2"></div>
                                        <div className="p-2 d-flex pt-3">
                                            <MDBCol size="8">Insurance Responsibility</MDBCol>
                                            <div className="ms-auto">
                                                <b>$71.76</b>
                                            </div>
                                        </div>
                                        <div className="p-2 d-flex">
                                            <MDBCol size="8">
                                                Patient Balance{" "}
                                                <span className="fa fa-question-circle text-dark"></span>
                                            </MDBCol>
                                            <div className="ms-auto">
                                                <b>$71.76</b>
                                            </div>
                                        </div> */}
                                        <div className="border-top px-2 mx-2"></div>
                                        <div className="p-2 d-flex pt-3">
                                            <MDBCol size="8">
                                                <b>Total</b>
                                            </MDBCol>
                                            <div className="ms-auto">
                                                <b className="text-success">${data?.doctorInfo.feePerCunsultation}</b>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="d-flex flex-row pb-3 pt-3">
                                        <div className="d-flex align-items-center pe-2">
                                            <MDBRadio name="radioNoLabel" id="radioNoLabel1" onClick={setruecod} />
                                        </div>
                                        <div className="rounded border d-flex w-100 p-3 align-items-center">
                                            <p className="mb-0">
                                                <MDBIcon
                                                    fab
                                                    icon="cc-visa"
                                                    size="lg"
                                                    className="text-primary pe-2"
                                                />{" "}
                                                Cash
                                            </p>
                                            {/* <div className="ms-auto">************3456</div> */}
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row pb-3">
                                        <div className="d-flex align-items-center pe-2">
                                            <MDBRadio name="radioNoLabel" id="radioNoLabel1" onClick={settrueonline} />
                                        </div>
                                        <div className="rounded border d-flex w-100 p-3 align-items-center">
                                            <p className="mb-0">
                                                <MDBIcon
                                                    fab
                                                    icon="cc-mastercard"
                                                    size="lg"
                                                    className="text-dark pe-2"
                                                />{" "}
                                                Online payment
                                            </p>
                                            <div className="ms-auto">************1038</div>
                                        </div>

                                    </div>

                                    <button className='btn ' style={{ background: '#063970', color: 'white' }} onClick={payment} >
                                        Proceed to payment
                                    </button>
                                    {/* <MDBBtn color="success" size="md" block>
                                        Proceed to payment
                                    </MDBBtn> */}

                                </MDBCol>

                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            </div>
        </>
    );
}