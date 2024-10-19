import React,{useState,useEffect} from "react";
import './ListProduct.css';
import cross_icon from './../../assets/cross_icon.png'

const backend_url = process.env.REACT_APP_API_URL;

const ListProduct = () => {

    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = async ()=>{
        await fetch(`${backend_url}/api/products`)
        .then((res)=>res.json())
        .then((data)=>setAllProducts(data));
    }

    useEffect(()=>{
        fetchInfo();
    },[])

    const removeProduct = async (id)=>{
        await fetch(`${backend_url}/api/products/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        })
        await fetchInfo();
    }

    return ( 
        <div className="list-product">
            <h1>All products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allproducts.map((product,index)=>{
                    return <><div className="listproduct-format-main listproduct-format">
                        <img src={product.image} alt="" className="listproduct-product-icon" />
                        <p>{product.name}</p>
                        <p>${product.old_price}</p>
                        <p>${product.new_price}</p>
                        <p>{product.category}</p>
                        <img onClick={()=>{removeProduct(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon"/>
                    </div>
                    <hr />
                    </>
                })}
            </div>
        </div>
     );
}
 
export default ListProduct;