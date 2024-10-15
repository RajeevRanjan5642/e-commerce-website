import React, { useContext } from "react";
import {ShopContext} from './../context/ShopContext'
import {useParams} from 'react-router-dom';
import Breadcrumb from "./../components/Breadcrumbs/Breadcrumbs"
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";

const Product = () => {
    const {all_product} = useContext(ShopContext)
    const {productId} = useParams();
    const product = all_product.find((e)=>e.id===Number(productId));
    return ( 
        <div>
            <Breadcrumb product={product}/>
            <ProductDisplay product={product}/>
            <RelatedProducts/>
        </div> 
    );
}
 
export default Product;