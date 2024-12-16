import React from "react";
import './Breadcrumbs.css'
import arrow_icon from './../../assets/breadcrum_arrow.png'

const Breadcrumb = (props) => {
    const {product} =props; 
    return ( 
        <div className="breadcrumb">
            Home <img src={arrow_icon} alt="" /> Shop <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}
        </div>
     );
}
 
export default Breadcrumb;