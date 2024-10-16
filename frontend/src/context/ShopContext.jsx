import React, {createContext, useEffect, useState} from 'react';

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{

    let cart = {};
    for(let idx=0; idx<300+1; idx++){
        cart[idx] = 0;
    }
    return cart;

}

const ShopContextProvider = (props) => {

    const [all_product, setAll_product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(()=>{
        const fetchData = async()=>{
            const response = await fetch('http://localhost:4000/api/products');
            const json = await response.json();
            if(response.ok){
                setAll_product(json);
            }
            // else throw new Error(json.error)
            if(localStorage.getItem('auth-token')){
                await fetch('http://localhost:4000/api/cart/getCart',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                    },
                    body:"",
                }).then((response)=>response.json()).then((data)=>setCartItems(data));
            }
        };
        fetchData();
    },[])

    const addToCart = async (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        if(localStorage.getItem('auth-token')){
            await fetch('http://localhost:4000/api/cart/addToCart',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                },
                body:JSON.stringify({'itemId':itemId}),
            }).then((response)=>response.json()).then((data)=>{});
        }
    }

    const removeFromCart = async (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(localStorage.getItem('auth-token')){
            await fetch('http://localhost:4000/api/cart/removeFromCart',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                },
                body:JSON.stringify({'itemId':itemId}),
            }).then((response)=>response.json()).then((data)=>{});
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