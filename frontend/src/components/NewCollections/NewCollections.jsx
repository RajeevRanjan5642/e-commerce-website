import React, { useEffect, useState } from 'react';
import './NewCollections.css';
import Item from '../Item/Item'

const NewCollections = () => {
    const [new_collection,setNew_collection] = useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await fetch('http://localhost:4000/api/products/newCollections');
            const json = await response.json();
            if(response.ok){
                setNew_collection(json);
            }
        };
        fetchData();
    },[]);
    return ( 
        <div className="new-collections">
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {new_collection.map((item,i)=>{
                   return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                })}
            </div>
        </div>
     );
}
 
export default NewCollections;