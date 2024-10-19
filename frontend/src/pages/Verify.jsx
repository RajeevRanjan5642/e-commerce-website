import React, { useEffect } from "react";
import "./CSS/Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const Verify = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const navigate = useNavigate();

    const backend_url = process.env.REACT_APP_API_URL;

    const verifyPayment = async () => {
        const response = await fetch(`${backend_url}/api/orders/verify`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({success,orderId}),
        })
        if(response.ok){
            navigate("/myorders");
        }
        else{
            navigate("/");
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[])
    
    return ( 
        <div className="verify">
        <div className="spinner"></div>
        </div>
     );
}
 
export default Verify;