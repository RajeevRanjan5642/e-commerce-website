import React, { useEffect, useState } from "react";
import './CSS/MyOrders.css'
import parcel_icon from  './../components/assets/parcel_icon.png';

const MyOrders = () => {

    const [data,setData] = useState([]);
    const token = localStorage.getItem('authorization');
    
    const fetchOrders = async ()=>{
        const response = await fetch("http://localhost:4000/api/orders/userorders",{
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
                    <div key={index} className='my-orders-order'>
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
                        <button>Track Order</button>
                    </div>
                )
            })}
        </div>
        </div> 
    );
}
 
export default MyOrders;