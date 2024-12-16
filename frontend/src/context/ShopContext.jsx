import React, {createContext, useEffect, useState} from 'react';
import {toast} from "react-toastify";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

    const [all_product, setAll_product] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const backend_url = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');

    useEffect(()=>{
        const fetchData = async()=>{
            const response = await fetch(`${backend_url}/api/products`);
            const json = await response.json();
            if(response.ok){
                setAll_product(json);
            }
            else alert(json.error);
            // else throw new Error(json.error)
            if(localStorage.getItem('token')){
                const response = await fetch(`${backend_url}/api/cart/getCart`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'authorization': `Bearer ${token}`,
                    },
                    body:"",
                });
                const json = await response.json();
                if(response.ok) setCartItems(json);
                else toast.error(json.error);
            }
        };
        fetchData();
    },[])

    const addToCart = async (itemId) =>{
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if(localStorage.getItem('token')){
            const response = await fetch(`${backend_url}/api/cart/addToCart`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'authorization': `Bearer ${token}`,
                },
                body:JSON.stringify({'itemId':itemId}),
            });
            const json = await response.json();
            if(!response.ok){
                toast.error(json.error);
            }
        }
    }

    const removeFromCart = async (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(localStorage.getItem('token')){
            const response = await fetch(`${backend_url}/api/cart/removeFromCart`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'authorization': `Bearer ${token}`,
                },
                body:JSON.stringify({'itemId':itemId}),
            });
            const json = await response.json();
            if(!response.ok){
                toast.error(json.error);
            }
        }
    }

    const getTotalCartAmount = () =>{
        let totalAmount=0;
        for (const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product)=>product.id===Number(item));
                totalAmount += itemInfo.new_price*cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () =>{
        let totalItem=0;
        for(const item in cartItems){
            if(cartItems[item]>0) totalItem+=cartItems[item];
        }
        return totalItem;
    }

    const contextValue = {all_product,cartItems,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;