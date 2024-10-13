import React from "react";
import './AddProduct.css';
import upload_area from './../../assets/upload_area.svg'

const AddProduct = () => {
    return ( 
        <div className="add-product">
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input type="text" name="name" placeholder="Type here"/>
                <div className="addproduct-price">
                    <div className="addproduct-itemfield">
                        <p>Price</p>
                        <input type="text" name="old_price" placeholder="Type here"/>
                    </div>
                    <div className="addproduct-itemfield">
                        <p>Offer Price</p>
                        <input type="text" name="new_price" placeholder="Type here"/>
                    </div>
                </div>
                <div className="addproduct-itemfield">
                    <p>Product Category</p>
                    <select name="category" className="add-product-selector">
                        <option value="women">Women</option>
                        <option value="men">Men</option>
                        <option value="kids">Kids</option>
                    </select>
                </div>
                <div className="addproduct-itemfield">
                    <label htmlFor="file-input">
                        <img src={upload_area} alt="" className="addproduct-thumbnail-img"/>
                    </label>
                    <input type="file" name='image' id='file-input' hidden/>
                </div>
                <button className="addproduct-btn">ADD</button>
            </div>
        </div>
     );
}
 
export default AddProduct;