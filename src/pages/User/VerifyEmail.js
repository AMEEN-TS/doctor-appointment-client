import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BaseUrl } from "../../utils/BaseUlr";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import "../style/user/verifyemail.css";

function VerifyEmail() {
  const navigate = useNavigate();
  const [emailVerified, setEmailVerified] = useState("");
  const params = useParams();

  const verifyToken = async () => {
    try {
      toast.loading();
      const response = await axios.post(`${BaseUrl}/api/user/verifyemail`, {
        token: params.token,
      });
      if (response.data.success) {
        setEmailVerified("true");
      } else {
        setEmailVerified("false");
      }
      toast.dismiss();
    } catch (error) {
      toast.dismiss();
      setEmailVerified("false");
    }
  };

  const deleteToken=async()=>{
    try{
      const response = await axios.post(`${BaseUrl}/api/user/deletetoken`,{
        token: params.token,
      });
      if(response){
        navigate("/login")
      }

      }catch(error){
        toast.error("Something went wrong");
      }
    
  }

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div className="verified">
      <Card className="text-center" style={{ width: 500 }}>
        {emailVerified === "true" && (
          <Card.Body>
            <Card.Img
              variant="top"
              style={{ width: 200, height: 200 }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa7R6eCfMTFpe-GTRsUSlxQz5AUsYxPckIng&usqp=CAU"
            />
            <Card.Title>Your email verified successfully</Card.Title>
            <Button  variant="primary" onClick={deleteToken}>Please Login</Button>
          </Card.Body>
        )}

        {emailVerified === "false" && (
          <Card.Body>
            <Card.Img
              variant="top"
              style={{ width: 200, height: 200 }}
              src="https://media.istockphoto.com/vectors/mail-icon-for-web-design-send-new-message-vector-vector-id1219938870?k=20&m=1219938870&s=612x612&w=0&h=usv1BOz1OeU3CWN9KIZRVOnEXowwwdJ_dl7mgXqawsA="
            />
            {/* <Card.Title>Your email verified successfully</Card.Title> */}
            <Card.Title>Invalid or Expired Token</Card.Title>
          </Card.Body>
        //   <Card.Body>
        //   <Card.Img
        //     variant="top"
        //     style={{ width: 200, height: 200 }}
        //     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa7R6eCfMTFpe-GTRsUSlxQz5AUsYxPckIng&usqp=CAU"
        //   />
        //   <Card.Title>Your email verified successfully</Card.Title>
        //   <Button  variant="primary" onClick={() => navigate("/login")}>Please Login</Button>
        // </Card.Body>
      )}
          
        
      </Card>
    </div>
  );
}

export default VerifyEmail;
