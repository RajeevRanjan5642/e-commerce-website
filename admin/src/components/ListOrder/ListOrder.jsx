import React from "react";
import './ListOrder.css'
import { useState } from "react";
import parcel_icon from './../../assets/parcel_icon.png'
import { useEffect } from "react";

const ListOrder = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async()=>{
        const response = await fetch('http://localhost:4000/api/orders');
        const json = await response.json();
        if(response.ok){
            setOrders(json);
        }
    }

    useEffect(()=>{
        fetchOrders();
    },[])

    const statusHandler = async (event,orderId) => {
        const response = await fetch("http://localhost:4000/api/orders/status",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({orderId,
                status:event.target.value}),
            }
        )
        if (response.ok){
          await fetchOrders();
        }
      }

    return ( 
        <div className='order add'>
        <h3>Order Page</h3>
        <div className="order-list">
            {orders.map((order,index)=>(
            <div key={index} className='order-item'>
                <img src={parcel_icon} alt="" />
                <div>
                <p className='order-item-product'>
                    {order.items.map((item,index)=>{
                    if (index===order.items.length-1){
                        return item.name + " x " + item.quantity
                    }
                    else{
                        return item.name + " x " + item.quantity + ", "
                    }
                    })}
                </p>
                <p className='order-item-name'>{order.address.firstName+" "+order.address.lastName}</p>
                <div className="order-item-address">
                    <p>{order.address.street+","}</p>
                    <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
                </div>
                <p>Items : {order.items.length}</p>
                <p>${order.amount}</p>
                <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                <option value="Ordered">Ordered</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
                </select>
            </div>
            ))}
        </div>
        </div>
    );
}
 
export default ListOrder;