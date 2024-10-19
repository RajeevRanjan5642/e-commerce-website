import React,{useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import './CSS/PlaceOrder.css';
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
    const {getTotalCartAmount, all_product, cartItems} = useContext(ShopContext);
    const token = localStorage.getItem('authorization');
    const backend_url = process.env.REACT_APP_API_URL;
    const [data,setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:""
    })
    const changeHandler = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    const placeOrder = async(e)=>{
        e.preventDefault();
        let orderItems = [];
        all_product.map((item)=>{
            if(cartItems[item.id]>0){
                let itemInfo = item;
                itemInfo['quantity'] = cartItems[item.id];
                orderItems.push(itemInfo);
            }
            // console.log(orderItems);
        })
        let orderData = {
           address:data,
           items:orderItems,
           amount:getTotalCartAmount()+1,
        }
        let response = await fetch(`${backend_url}/api/orders/place`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'authorization': `Bearer ${token}`,
            },
            body:JSON.stringify(orderData),
        });

        const json = await response.json();
        if(response.ok){
            const {session_url} = json;
            window.location.replace(session_url);
        }
    }
    const navigate = useNavigate();

    useEffect(()=>{
        if(!token || getTotalCartAmount()===0){
            navigate('/cart');
        }
    },[])

    return ( 
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input name="firstName" onChange={changeHandler} value={data.firstName} type="text" placeholder="First Name" required/>
                    <input name="lastName" onChange={changeHandler} value={data.lastName} type="text" placeholder="Last Name" required/>
                </div>
                <input name="email" onChange={changeHandler} value={data.email} type="email" placeholder="Email Address" required/>
                <input name="street" onChange={changeHandler} value={data.street}type="text" placeholder="Street" required/>
                <div className="multi-fields">
                    <input name="city" onChange={changeHandler} value={data.city} type="text" placeholder="City" required/>
                    <input name="state" onChange={changeHandler} value={data.state} type="text" placeholder="State" required/>
                </div>
                <div className="multi-fields">
                    <input name="zipcode" onChange={changeHandler} value={data.zipcode} type="text" placeholder="Zip code" required/>
                    <input name="country" onChange={changeHandler} value={data.country} type="text" placeholder="Country" required/>
                </div>
                <input name="phone" onChange={changeHandler} value={data.phone} type="text" placeholder="phone" required/>
            </div>
            <div className="place-order-right">
            <div className="cart-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}.00</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Shipping Fee</p>
                            <p>${getTotalCartAmount()===0?0:1}.00</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <h3>Total </h3>
                            <h3>${getTotalCartAmount()===0?0:getTotalCartAmount()+1}.00</h3>
                        </div>
                    </div>
                    <button type="submit" >PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
     );
}
 
export default PlaceOrder;