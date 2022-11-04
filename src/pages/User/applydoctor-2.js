
import React, { useState } from 'react'
import Navbar from "../../components/Navbar";
import DoctorForm from '../../components/DoctorForm';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../Redux/alertsSlice';
import { toast } from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import {
    Card, CardContent, Button,
    Typography, FormControl, InputLabel, OutlinedInput, Select, MenuItem
  } from '@mui/material'

import moment from "moment";



function ApplyDoctor() {
    const [image,setImage] = useState()
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const handleSubmit=async(e) => {
        e.preventDefault()
  
      
    let formdata= new FormData();
    formdata.append("firstName",e.target.firstName.value);
    formdata.append("lastName",e.target.lastName.value);
    formdata.append("phoneNumber",e.target.phoneNumber.value);
    formdata.append("address",e.target.address.value)
    formdata.append("website",e.target.website.value)
    formdata.append("specialization",e.target.specialization.value)
    formdata.append("experience",e.target.experience.value)
    formdata.append("feePerConsultation",e.target.feePerConsultation.value)
    // formdata.append("timings",e.target.timings.value)
    formdata.append("image",image)
    console.log(formdata,"frt fromdat log")
        
     

        try {
            dispatch(showLoading());
            const response = await axios.post(
                "/api/user/apply-doctor-account",formdata,
               
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

<Navbar />
<div style={{ paddingTop: "100px" }}>
          <form onSubmit={handleSubmit} >
            <Typography gutterBottom variant="h3" align='center'>Apply Doctor</Typography>
            <Card>
              <CardContent>
                <FormControl fullWidth sx={{ m: 1, width: '70ch', ml: 45 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">First Name</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" label="First Name" type='text'  name='firstName' />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: '70ch', ml: 45 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">Last Name</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" label="Last Name" type='text'  name='lastName' />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: '70ch', ml: 45 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">phone Number</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" label="phone Number" type='text' name='phoneNumber' />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: '70ch', ml: 45 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">address</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" label= "address" name='address' />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: '70ch', ml: 45 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">Website</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount" label= "Website" name='website' />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: '70ch', ml: 45 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">specialization</InputLabel>               
                  <OutlinedInput id="outlined-adornment-amount" label="specialization"type='text' name='specialization' />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: '70ch', ml: 45 }}>
                  <InputLabel htmlFor="outlined-adornment-amount"> experience</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount"  label="experience" name='experience' />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: '70ch', ml: 45 }}>
                  <InputLabel htmlFor="outlined-adornment-amount"> feePerConsultation</InputLabel>
                  <OutlinedInput id="outlined-adornment-amount"  label="feePerConsultation" name='feePerConsultation' />
                </FormControl>
                <Typography sx={{ mr: 50 }} align="center">Image</Typography>
                  <FormControl fullWidth sx={{ m: 1, width: '70ch', ml: 45 }}>
                      <InputLabel htmlFor="outlined-adornment-amount"></InputLabel>
                      <OutlinedInput id="outlined-adornment-amount" label="Amount" type="file" name='image' onChange={(e)=>setImage(e.target.files[0])}/>
                  </FormControl>
              </CardContent>
              <Box align="center">

                <Button variant="contained" type="submit">Submit</Button>
              </Box>


            </Card>

          </form>

        </div>
        </>
    )
}

export default ApplyDoctor
