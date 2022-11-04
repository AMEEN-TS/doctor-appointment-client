import React from 'react';
import { Card } from 'antd';
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

function Doctor({doctor}) {
  const navigate = useNavigate();
  return (
    <Card
    hoverable
    onClick={() => navigate(`/doctor-info/${doctor._id}`)}
    style={{
      width: 300,
      borderRadius:"8px",
      height:300
      
      
    }}
    cover={<img style={{objectFit:"fill",height:"200px"}} alt="example" src={doctor.image} />}
  >
    <Meta  title= {doctor.firstName} description={doctor.specialization} />
  </Card>
  )
}

export default Doctor
