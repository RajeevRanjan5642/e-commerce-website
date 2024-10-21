import React, { useState } from "react";
import './AddProduct.css';
import upload_area from './../../assets/upload_area.svg';
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
    
    const backend_url = process.env.REACT_APP_API_URL;
    const [image,setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        category:"women",
        new_price:"",
        old_price:""
    });

    const imageHandler = (e) =>{
        setImage(e.target.files[0]);
    }

    const changeHandler = (e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
        // console.log(productDetails);
    }

    const addProduct = async () =>{

        const formData = new FormData();
        formData.append("name",productDetails.name);
        formData.append("product",image);
        formData.append("category",productDetails.category);
        formData.append("new_price",productDetails.new_price);
        formData.append("old_price",productDetails.old_price);
    
        const response = await fetch(`${backend_url}/api/products`,{
            method:'POST',
            body:formData,
        });
        if(response.ok){
            setProductDetails({
                name: "",
                category:"women",
                new_price:"",
                old_price:""
            });
            setImage(false);
            alert('product added');
        }
        else toast.error("failed");
    }

    return ( 
        <div className="add-product">
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Type here"/>
                <div className="addproduct-price">
                    <div className="addproduct-itemfield">
                        <p>Price</p>
                        <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Type here"/>
                    </div>
                    <div className="addproduct-itemfield">
                        <p>Offer Price</p>
                        <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="Type here"/>
                    </div>
                </div>
                <div className="addproduct-itemfield">
                    <p>Product Category</p>
                    <select value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selector">
                        <option value="women">Women</option>
                        <option value="men">Men</option>
                        <option value="kids">Kids</option>
                    </select>
                </div>
                <div className="addproduct-itemfield">
                    <label htmlFor="file-input">
                        <img src={image?URL.createObjectURL(image):upload_area} alt="" className="addproduct-thumbnail-img"/>
                    </label>
                    <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
                </div>
                <button onClick={addProduct} className="addproduct-btn">ADD</button>
            </div>
            <ToastContainer/>
        </div>
     );
}
 
export default AddProduct;