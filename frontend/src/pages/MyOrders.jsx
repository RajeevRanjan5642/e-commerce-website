import React, { useEffect, useState } from "react";
import './CSS/MyOrders.css'
import parcel_icon from  './../assets/parcel_icon.png';

const MyOrders = () => {

    const [data,setData] = useState([]);
    const token = localStorage.getItem('token');

    const backend_url = process.env.REACT_APP_API_URL;
    
    const fetchOrders = async ()=>{
        const response = await fetch(`${backend_url}/api/orders/userorders`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authorization':`Bearer ${token}`,
            }
        });
        const json = await response.json();
        if(response.ok) setData(json);
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token])

    return ( 
        <div className="my-orders">
            <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index)=>{
                return (
                    <div key={index} className='my-orders-order card'>
                        <img src={parcel_icon} alt="" />
                        <p>{order.items.map((item,index)=>{
                            if (index === order.items.length-1) {
                                return item.name+" x "+item.quantity
                            }
                            else{
                                return item.name+" x "+item.quantity+","
                            }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                )
            })}
        </div>
        </div> 
    );
}
 
export default MyOrders;