import React,{useContext} from "react";
// import { useNavigate } from "react-router-dom";
import './PlaceOrder.css';
import { ShopContext } from "../../context/ShopContext";

const PlaceOrder = () => {
    const {getTotalCartAmount} = useContext(ShopContext);
    // const navigate = useNavigate();
    return ( 
        <form className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name"/>
                </div>
                <input type="email" placeholder="Email Address"/>
                <input type="text" placeholder="Street"/>
                <div className="multi-fields">
                    <input type="text" placeholder="City" />
                    <input type="text" placeholder="State"/>
                </div>
                <div className="multi-fields">
                    <input type="text" placeholder="Zip code" />
                    <input type="text" placeholder="Country"/>
                </div>
                <input type="text" placeholder="phone"/>
            </div>
            <div className="place-order-right">
            <div className="cart-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="card-total-details">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="card-total-details">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </form>
     );
}
 
export default PlaceOrder;