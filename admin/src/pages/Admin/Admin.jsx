import React from "react";
import './Admin.css';
import Sidebar from "../../components/Sidebar/Sidebar";
import {Routes,Route} from 'react-router-dom';
import AddProduct from "../../components/AddProduct/AddProduct";
import ListProduct from "../../components/ListProduct/ListProduct";
import ListOrder from "../../components/ListOrder/ListOrder";
import Login from "./../../components/Login/Login"

const Admin = () => {
    return ( 
        <div className="admin">
            <Sidebar/>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/addproduct' element={<AddProduct/>}/>
                <Route path='/listproduct' element={<ListProduct/>}/>
                <Route path="/listorder" element={<ListOrder/>}/>
            </Routes>
        </div>
     );
}
 
export default Admin;